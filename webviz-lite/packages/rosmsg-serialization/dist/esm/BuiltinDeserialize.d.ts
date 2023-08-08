export declare const fixedSizeTypes: Map<"bool" | "int8" | "uint8" | "int16" | "uint16" | "int32" | "uint32" | "int64" | "uint64" | "float32" | "float64" | "time" | "duration", 2 | 1 | 4 | 8>;
export declare type FixedSizeTypes = Parameters<typeof fixedSizeTypes.get>[0];
declare type BuiltinTypeMap = {
    bool: boolean;
    int8: number;
    uint8: number;
    int16: number;
    uint16: number;
    int32: number;
    uint32: number;
    int64: bigint;
    uint64: bigint;
    float32: number;
    float64: number;
    time: {
        sec: number;
        nsec: number;
    };
    duration: {
        sec: number;
        nsec: number;
    };
};
declare type BuiltinArrayTypeMap = {
    int8: Int8Array;
    uint8: Uint8Array;
    int16: Int16Array;
    uint16: Uint16Array;
    int32: Int32Array;
    uint32: Uint32Array;
    int64: BigInt64Array;
    uint64: BigUint64Array;
    float32: Float32Array;
    float64: Float64Array;
};
declare type BuiltinTypes = keyof BuiltinTypeMap & FixedSizeTypes;
declare type BuiltinReaders = {
    [K in BuiltinTypes]: (view: DataView, offset: number) => BuiltinTypeMap[K];
} & {
    [K in BuiltinTypes as `${K}Array`]: (view: DataView, offset: number, len: number) => K extends keyof BuiltinArrayTypeMap ? BuiltinArrayTypeMap[K] : BuiltinTypeMap[K][];
};
export declare const deserializers: BuiltinReaders & {
    string: (view: DataView, offset: number) => string;
    fixedArray: (view: DataView, offset: number, len: number, elementDeser: (view: DataView, offset: number) => unknown, elementSize: (view: DataView, offset: number) => number) => unknown[];
    dynamicArray: (view: DataView, offset: number, elementDeser: (view: DataView, offset: number) => unknown, elementSize: (view: DataView, offset: number) => number) => unknown[];
};
export {};
//# sourceMappingURL=BuiltinDeserialize.d.ts.map