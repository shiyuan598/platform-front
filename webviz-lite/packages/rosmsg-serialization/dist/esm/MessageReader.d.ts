import { RosMsgDefinition } from "@foxglove/rosmsg";
declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
interface TypedArrayConstructor {
    new (length?: number): TypedArray;
    new (buffer: ArrayBuffer, byteOffset: number, length: number): TypedArray;
    BYTES_PER_ELEMENT: number;
}
export declare class StandardTypeReader {
    buffer: ArrayBufferView;
    offset: number;
    view: DataView;
    _decoder?: TextDecoder;
    _decoderStatus: "NOT_INITIALIZED" | "INITIALIZED" | "NOT_AVAILABLE";
    constructor(buffer: ArrayBufferView);
    private _intializeTextDecoder;
    json(): unknown;
    string(): string;
    bool(): boolean;
    int8(): number;
    uint8(): number;
    typedArray(len: number | null | undefined, TypedArrayConstructor: TypedArrayConstructor): TypedArray;
    int16(): number;
    uint16(): number;
    int32(): number;
    uint32(): number;
    float32(): number;
    float64(): number;
    int64(): bigint;
    uint64(): bigint;
    time(): {
        sec: number;
        nsec: number;
    };
    duration(): {
        sec: number;
        nsec: number;
    };
}
export declare const createParsers: ({ definitions, options, topLevelReaderKey, }: {
    definitions: readonly RosMsgDefinition[];
    options?: {
        freeze?: boolean | undefined;
    } | undefined;
    topLevelReaderKey: string;
}) => Map<string, new (reader: StandardTypeReader) => unknown>;
export declare class MessageReader {
    reader: {
        new (reader: StandardTypeReader): unknown;
    };
    constructor(definitions: readonly RosMsgDefinition[], options?: {
        freeze?: boolean;
    });
    readMessage<T = unknown>(buffer: ArrayBufferView): T;
}
export {};
//# sourceMappingURL=MessageReader.d.ts.map