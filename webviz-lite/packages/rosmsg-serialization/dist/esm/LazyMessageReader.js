import buildReader from "./buildReader";
function isBigEndian() {
    const array = new Uint8Array(4);
    const view = new Uint32Array(array.buffer);
    view[0] = 1;
    return array[3] === 1;
}
// Our fast handling of typed arrays requires that the user be using little endian mode since
// the browser makes typed arrays use the architecture endianness and ROS messages are little endian
const isLittleEndian = !isBigEndian();
if (!isLittleEndian) {
    throw new Error("Only Little Endian architectures are supported");
}
export class LazyMessageReader {
    constructor(definitions) {
        this.readerImpl = buildReader(definitions);
        this.definitions = definitions;
    }
    // Return the size of our message within the buffer
    size(buffer) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return this.readerImpl.size(view);
    }
    source() {
        return this.readerImpl.source();
    }
    // Create a LazyMessage for the buffer
    // We template on R here for call site type information if the class type information T is not
    // known or available
    readMessage(buffer) {
        const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        return this.readerImpl.build(view);
    }
}
//# sourceMappingURL=LazyMessageReader.js.map