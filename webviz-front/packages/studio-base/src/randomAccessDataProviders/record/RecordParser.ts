
import { zhito } from "@zhito/proto";
// import {SECTION_LENGTH, HEADER_LENGTH} from "./common";
import { MessageEvent, Topic } from "@foxglove/studio-base/players/types";
import protobufjs from "protobufjs";
import descriptor from "protobufjs/ext/descriptor";
import { nanoToTime } from "@foxglove/studio-base/randomAccessDataProviders/record/util";
import { protobufDefinitionsToDatatypes } from "@foxglove/studio-base/randomAccessDataProviders/record/protobufDefinitionsToDatatypes";
import { RosDatatypes } from "@foxglove/studio-base/randomAccessDataProviders/record/types";

const SectionType = zhito.cyber.proto.SectionType
type RecordType = zhito.cyber.proto.Header | zhito.cyber.proto.Index | zhito.cyber.proto.Channel | zhito.cyber.proto.ChunkHeader | zhito.cyber.proto.ChunkBody
type Decoder = {
    decode: (buf: Uint8Array) => RecordType
}
type Section = {
    type: zhito.cyber.proto.SectionType
    position: number, // section 开始位置 buffer +12
    size: number
}


const ChannelNeesParse = [
    "zhito.adm.ADM2PP",
    "zhito.drivers.CompressedImage",
    "zhito.adm.ADM2RCF",
    "zhito.drivers.h2pu.H2puImu",
    "zhito.drivers.h2pu.Ublox"
]

const SECTION_LENGTH = 16;
const HEADER_LENGTH = 2048;



function decodeProtoDesc(desc: zhito.cyber.proto.IProtoDesc, files: descriptor.IFileDescriptorProto[]) {
    if (desc.desc) {
        const file = descriptor.FileDescriptorProto.decode(desc.desc) as descriptor.IFileDescriptorProto;
        if (files.findIndex(f => f.name === file.name) === -1) {
            files.push(file);
        }

    }
    desc.dependencies?.forEach(child => {
        decodeProtoDesc(child, files)
    })
}

function protoDescToProtoSet(desc: Uint8Array): protobufjs.Message {
    const protoDesc = zhito.cyber.proto.ProtoDesc.decode(desc);
    const files = [] as descriptor.IFileDescriptorProto[];
    decodeProtoDesc(protoDesc, files);
    return descriptor.FileDescriptorSet.fromObject({ file: files })
}
export class RecordReader {
    buffer: Uint8Array;
    buffers: Uint8Array[];
    bytesRead: number;
    header: zhito.cyber.proto.Header | undefined;
    index: null;
    channelInfo: {};
    messages: null;
    parsers: null;
    topics: Topic[];
    messageByChannel: Map<string, MessageEvent<any>[]>;
    decoders: Map<string, protobufjs.Type>
    datatypes: RosDatatypes;
    constructor() {
        this.bytesRead = 0;
        this.index = null;
        this.channelInfo = {};
        this.messages = null;
        this.parsers = null;
        this.buffer = new Uint8Array();
        this.buffers = [];
        this.topics = [];
        this.messageByChannel = new Map()
        this.decoders = new Map()
        this.datatypes = new Map();
    }

    reset() {
        this.bytesRead = 0;
        this.header = undefined;
        this.index = null;
        this.channelInfo = {};
        this.messages = null;
        this.parsers = null;
        this.buffer = new Uint8Array();
        this.buffers = [];
        this.topics = [];
        this.messageByChannel = new Map()
    }

    read(buffer: Uint8Array, topics: Topic[], messagesByChannel: Map<string, MessageEvent<unknown>[]>, datatypes: RosDatatypes) {
        const newBuffer = new Uint8Array(this.buffer.length - this.bytesRead + buffer.length);//[ ...this.buffer.slice(this.bytesRead,this.buffer.length), ...buffer ]);
        newBuffer.set(this.buffer.slice(this.bytesRead, this.buffer.length))
        newBuffer.set(buffer, this.buffer.length - this.bytesRead)
        this.bytesRead = 0;
        this.buffer = newBuffer;
        this.topics = topics;
        this.addTFTopic(topics);
        this.datatypes = datatypes;
        this.messageByChannel = messagesByChannel;
        this.readSections();
        return true

    }

    addTFTopic(topics: Topic[]) {
        if (topics.findIndex(topic => topic.name === "/tf") == -1) {
            topics.push({
                name: "/tf",
                datatype: "tf2_msgs/TFMessage"
            })
            topics.push({
                name: "/zhito/localization/pose/marker",
                datatype: "visualization_msgs/Marker"
            })
        }
    }

    readSections = (): void => {
        const section = this.readSection(this.bytesRead);
        if (!section) {
            return undefined
        }
        let result: RecordType | undefined

        // decode section
        if (section.type === SectionType.SECTION_HEADER) {
            result = this.decodeSection(section, zhito.cyber.proto.Header) as zhito.cyber.proto.Header;
            if (result) {
                this.header = result;
            }
        } else if (section.type === SectionType.SECTION_CHANNEL) {
            result = this.decodeSection(section, zhito.cyber.proto.Channel) as zhito.cyber.proto.Channel;
            if (result) {
                this.processChannel(result);
            }
        } else if (section.type === SectionType.SECTION_CHUNK_BODY) {
            result = this.decodeSection(section, zhito.cyber.proto.ChunkBody) as zhito.cyber.proto.ChunkBody;
            if (result) {
                this.processChunk(result);
            } else {
                console.log("record decode faile", section)
            }


        } else if (section.type === SectionType.SECTION_CHUNK_HEADER) {
            result = this.decodeSection(section, zhito.cyber.proto.ChunkHeader) as zhito.cyber.proto.ChunkHeader;
        } else if (section.type === SectionType.SECTION_INDEX) {
            result = this.decodeSection(section, zhito.cyber.proto.Index) as zhito.cyber.proto.Index;
        } else {
            console.log(section.type)
        }

        // update byte index
        if (result) {
            if (section.type === SectionType.SECTION_HEADER) {
                this.bytesRead = section.position + HEADER_LENGTH + SECTION_LENGTH;
            } else {
                this.bytesRead = section.position + section.size + SECTION_LENGTH;
            }
            this.readSections()

        } else {
            return undefined
        }
    }

    processChannel(channel: zhito.cyber.proto.Channel) {
        const descriptorMsg = protoDescToProtoSet(channel.proto_desc);
        let needParse = ChannelNeesParse.includes(channel.message_type)
        try {
            const MsgRoot = protobufjs.Root.fromDescriptor(descriptorMsg);
            MsgRoot.resolveAll();
            const decoder = MsgRoot.root.lookupType(channel.message_type);
            this.decoders.set(channel.name, decoder);
            if (needParse) {

                const type = MsgRoot.lookupType(channel.message_type);


                const datatypes: RosDatatypes = new Map();
                protobufDefinitionsToDatatypes(datatypes, type);
                for (const [name, types] of datatypes) {
                    this.datatypes.set(name, types);
                }

            }
        } catch (e) {
            console.log(e)
            needParse = false

        }


        // const keys = channel.message_type.split(".");
        // let decoder = Proto as any;
        // keys.map(key => {
        //     decoder = decoder[key] || {};
        // })
        // if (decoder?.decode) {
        //     this.decoders.set(channel.name, decoder);
        // }

        const topic: Topic = {
            // ...channel,
            datatype: needParse ? channel.message_type : "zhito2ros_msg/ZhitoProto",
            name: channel.name,
            proto: channel.message_type
        };
        this.topics.push(topic);
    }

    processChunk(chunk: zhito.cyber.proto.ChunkBody) {
        // return
        chunk.messages.forEach(message => {
            let messages = this.messageByChannel.get(message.channel_name ?? "");
            const decoder = this.decoders.get(message.channel_name ?? "")
            if (!messages) {
                messages = [];
                this.messageByChannel.set(message.channel_name || "", messages);
            }
            const receiveTime = nanoToTime(BigInt(message.time as number))
            messages.push({
                topic: message.channel_name || "",
                receiveTime,
                sizeInBytes: message.content?.length ?? 0,
                message: decoder ? decoder.decode(message.content as Uint8Array) : null,//null,//
                //@ts-ignore
                buffer: message.content
            })
        })
    }

    readSection(position: number): Section | undefined {
        const section = {
            type: 0,
            size: 0,
            position: position
        } as Section;
        const typeBuffer = this.readBytes(position, 4);
        if (!typeBuffer) {
            return undefined
        }
        const sectionTypeBuf = Buffer.from(typeBuffer);
        section.type = sectionTypeBuf.readInt32LE(0);

        const sizeBuffer = this.readBytes(position + 4, 8);
        if (!sizeBuffer) {
            return undefined
        }

        const sectionSizeBuf = Buffer.from(sizeBuffer);//new Int32Array(this.readBytes(position+4,position+12).buffer,0,2);//.from() ;

        // const high = sectionSizeBuf.readInt32LE(0);
        const low = sectionSizeBuf.readInt32LE(4);
        // console.log(high,low)
        section.size = low; //to do handle big int
        if (isNaN(section.size)) {

            return undefined
        }

        return section;
    }

    decodeSection(section: Section, decoder: Decoder): RecordType | undefined {

        const buf = this.readBytes(section.position + SECTION_LENGTH, section.size)
        // const buf = Buffer.from()
        if (!buf) return undefined
        try {
            return decoder.decode(buf);
        } catch (err) {
            console.log(err)
        }
        return undefined
    }

    readBytes(position: number, size: number): Uint8Array | undefined {

        // console.log(`bytes read: ${count}, total: ${this.bytesRead}`);
        if ((position + size) > this.buffer.length) {
            // console.log("readBytes failed");
            return undefined
        }
        const buf = this.buffer.slice(position, position + size);
        return buf;
    }

}
