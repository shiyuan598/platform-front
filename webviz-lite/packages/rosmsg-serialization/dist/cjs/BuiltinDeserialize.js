"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializers = exports.fixedSizeTypes = void 0;
// Given a TypeArray constructor (Int32Array, Float32Array, etc), create a deserialization function
// This deserialization function tries to first use aligned access and falls back to iteration
function MakeTypedArrayDeserialze(TypedArrayConstructor, getter) {
    if (TypedArrayConstructor == undefined) {
        console.warn("bigint arrays are not supported in this environment");
    }
    return (view, offset, len) => {
        if (TypedArrayConstructor == undefined) {
            throw new Error("bigint arrays are not supported in this environment");
        }
        let currentOffset = offset;
        const totalOffset = view.byteOffset + currentOffset;
        const size = TypedArrayConstructor.BYTES_PER_ELEMENT * len;
        const maxSize = view.byteLength - offset;
        if (size < 0 || size > maxSize) {
            throw new RangeError(`Array(${getter}) deserialization error: size ${size}, maxSize ${maxSize}`);
        }
        // new TypedArray(...) will throw if you try to make a typed array on unaligned boundary
        // but for aligned access we can use a typed array and avoid any extra memory alloc/copy
        if (totalOffset % TypedArrayConstructor.BYTES_PER_ELEMENT === 0) {
            return new TypedArrayConstructor(view.buffer, totalOffset, len);
        }
        // benchmarks indicate for len < ~10 doing each individually is faster than copy
        if (len < 10) {
            const arr = new TypedArrayConstructor(len);
            for (let idx = 0; idx < len; ++idx) {
                arr[idx] = view[getter](currentOffset, true);
                currentOffset += TypedArrayConstructor.BYTES_PER_ELEMENT;
            }
            return arr;
        }
        // if the length is > 10, then doing a copy of the data to align it is faster
        // using _set_ is slightly faster than slice on the array buffer according to today's benchmarks
        const copy = new Uint8Array(size);
        copy.set(new Uint8Array(view.buffer, totalOffset, size));
        return new TypedArrayConstructor(copy.buffer, copy.byteOffset, len);
    };
}
// Sizes for builtin types - if a type has a fixed size, the deserializer is able to optimize
exports.fixedSizeTypes = new Map([
    ["bool", 1],
    ["int8", 1],
    ["uint8", 1],
    ["int16", 2],
    ["uint16", 2],
    ["int32", 4],
    ["uint32", 4],
    ["int64", 8],
    ["uint64", 8],
    ["float32", 4],
    ["float64", 8],
    ["time", 8],
    ["duration", 8],
]);
const decoder = new TextDecoder("utf8");
exports.deserializers = {
    bool: (view, offset) => view.getUint8(offset) !== 0,
    int8: (view, offset) => view.getInt8(offset),
    uint8: (view, offset) => view.getUint8(offset),
    int16: (view, offset) => view.getInt16(offset, true),
    uint16: (view, offset) => view.getUint16(offset, true),
    int32: (view, offset) => view.getInt32(offset, true),
    uint32: (view, offset) => view.getUint32(offset, true),
    int64: (view, offset) => view.getBigInt64(offset, true),
    uint64: (view, offset) => view.getBigUint64(offset, true),
    float32: (view, offset) => view.getFloat32(offset, true),
    float64: (view, offset) => view.getFloat64(offset, true),
    time: (view, offset) => {
        const sec = view.getUint32(offset, true);
        const nsec = view.getUint32(offset + 4, true);
        return { sec, nsec };
    },
    duration: (view, offset) => exports.deserializers.time(view, offset),
    string: (view, offset) => {
        const len = view.getInt32(offset, true);
        const totalOffset = view.byteOffset + offset + 4;
        const maxLen = view.byteLength - offset;
        if (len < 0 || len > maxLen) {
            throw new RangeError(`String deserialization error: length ${len}, maxLength ${maxLen}`);
        }
        const codePoints = new Uint8Array(view.buffer, totalOffset, len);
        // For short strings, using fromCharCode is faster then decoder (according to benchmarks)
        if (codePoints.length <= 40) {
            return String.fromCharCode.apply(null, codePoints);
        }
        return decoder.decode(codePoints);
    },
    boolArray: (view, offset, len) => {
        let currentOffset = offset;
        const arr = new Array(len);
        for (let idx = 0; idx < len; ++idx) {
            arr[idx] = exports.deserializers.bool(view, currentOffset);
            currentOffset += 1;
        }
        return arr;
    },
    int8Array: MakeTypedArrayDeserialze(Int8Array, "getInt8"),
    uint8Array: MakeTypedArrayDeserialze(Uint8Array, "getUint8"),
    int16Array: MakeTypedArrayDeserialze(Int16Array, "getInt16"),
    uint16Array: MakeTypedArrayDeserialze(Uint16Array, "getUint16"),
    int32Array: MakeTypedArrayDeserialze(Int32Array, "getInt32"),
    uint32Array: MakeTypedArrayDeserialze(Uint32Array, "getUint32"),
    int64Array: MakeTypedArrayDeserialze(typeof BigInt64Array === "function" ? BigInt64Array : undefined, "getBigInt64"),
    uint64Array: MakeTypedArrayDeserialze(typeof BigUint64Array === "function" ? BigUint64Array : undefined, "getBigUint64"),
    float32Array: MakeTypedArrayDeserialze(Float32Array, "getFloat32"),
    float64Array: MakeTypedArrayDeserialze(Float64Array, "getFloat64"),
    timeArray: (view, offset, len) => {
        let currentOffset = offset;
        // Time and Duration are actually arrays of int32
        // If the location of the TimeArray meets Int32Array aligned access requirements, we can use Int32Array
        // to speed up access to the int32 values.
        // Otherwise we fall back to individual value reading via DataView
        const timeArr = new Array(len);
        const totalOffset = view.byteOffset + currentOffset;
        // aligned access provides for a fast path to typed array construction
        if (totalOffset % Int32Array.BYTES_PER_ELEMENT === 0) {
            const intArr = new Int32Array(view.buffer, totalOffset, len * 2);
            for (let i = 0, j = 0; i < len; ++i, j = j + 2) {
                timeArr[i] = {
                    sec: intArr[j],
                    nsec: intArr[j + 1],
                };
            }
        }
        else {
            for (let idx = 0; idx < len; ++idx) {
                timeArr[idx] = {
                    sec: view.getInt32(currentOffset, true),
                    nsec: view.getInt32(currentOffset + 4, true),
                };
                currentOffset += 8;
            }
        }
        return timeArr;
    },
    durationArray: (view, offset, len) => exports.deserializers.timeArray(view, offset, len),
    fixedArray: (view, offset, len, elementDeser, elementSize) => {
        let currentOffset = offset;
        const arr = new Array(len);
        for (let idx = 0; idx < len; ++idx) {
            arr[idx] = elementDeser(view, currentOffset);
            currentOffset += elementSize(view, currentOffset);
        }
        return arr;
    },
    dynamicArray: (view, offset, elementDeser, elementSize) => {
        const len = view.getUint32(offset, true);
        return exports.deserializers.fixedArray(view, offset + 4, len, elementDeser, elementSize);
    },
};
//# sourceMappingURL=BuiltinDeserialize.js.map