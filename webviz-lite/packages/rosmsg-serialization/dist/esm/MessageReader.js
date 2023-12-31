// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.
// this has hard-coded buffer reading functions for each
// of the standard message types http://docs.ros.org/api/std_msgs/html/index-msg.html
// eventually custom types decompose into these standard types
export class StandardTypeReader {
    constructor(buffer) {
        this._decoderStatus = "NOT_INITIALIZED";
        this.buffer = buffer;
        this.offset = 0;
        this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    _intializeTextDecoder() {
        if (typeof global.TextDecoder === "undefined") {
            this._decoderStatus = "NOT_AVAILABLE";
            return;
        }
        try {
            this._decoder = new global.TextDecoder("ascii");
            this._decoderStatus = "INITIALIZED";
        }
        catch (e) {
            // Swallow the error if we don't support ascii encoding.
            this._decoderStatus = "NOT_AVAILABLE";
        }
    }
    json() {
        const resultString = this.string();
        try {
            return JSON.parse(resultString);
        }
        catch {
            return `Could not parse ${resultString}`;
        }
    }
    string() {
        const len = this.int32();
        const totalOffset = this.view.byteOffset + this.offset;
        const maxLen = this.view.byteLength - this.offset;
        if (len < 0 || len > maxLen) {
            throw new RangeError(`String deserialization error: length ${len}, maxLength ${maxLen}`);
        }
        const codePoints = new Uint8Array(this.view.buffer, totalOffset, len);
        this.offset += len;
        // if the string is relatively short we can use apply, but longer strings can benefit from the speed of TextDecoder.
        if (codePoints.length < 1000) {
            return String.fromCharCode.apply(null, Array.from(codePoints));
        }
        // Use TextDecoder if it is available and supports the "ascii" encoding.
        if (this._decoderStatus === "NOT_INITIALIZED") {
            this._intializeTextDecoder();
        }
        if (this._decoder != undefined) {
            return this._decoder.decode(codePoints);
        }
        // Otherwise, use string concatentation.
        let data = "";
        for (let i = 0; i < len; i++) {
            data += String.fromCharCode(codePoints[i]);
        }
        return data;
    }
    bool() {
        return this.uint8() !== 0;
    }
    int8() {
        return this.view.getInt8(this.offset++);
    }
    uint8() {
        return this.view.getUint8(this.offset++);
    }
    typedArray(len, TypedArrayConstructor) {
        const arrayLength = len == undefined ? this.uint32() : len;
        const view = this.view;
        const totalOffset = this.offset + view.byteOffset;
        this.offset += arrayLength * TypedArrayConstructor.BYTES_PER_ELEMENT;
        // new TypedArray(...) will throw if you try to make a typed array on unaligned boundary
        // but for aligned access we can use a typed array and avoid any extra memory alloc/copy
        if (totalOffset % TypedArrayConstructor.BYTES_PER_ELEMENT === 0) {
            return new TypedArrayConstructor(view.buffer, totalOffset, arrayLength);
        }
        // copy the data to align it
        // using _set_ is slightly faster than slice on the array buffer according to benchmarks when written
        const size = TypedArrayConstructor.BYTES_PER_ELEMENT * arrayLength;
        const copy = new Uint8Array(size);
        copy.set(new Uint8Array(view.buffer, totalOffset, size));
        return new TypedArrayConstructor(copy.buffer, copy.byteOffset, arrayLength);
    }
    int16() {
        const result = this.view.getInt16(this.offset, true);
        this.offset += 2;
        return result;
    }
    uint16() {
        const result = this.view.getUint16(this.offset, true);
        this.offset += 2;
        return result;
    }
    int32() {
        const result = this.view.getInt32(this.offset, true);
        this.offset += 4;
        return result;
    }
    uint32() {
        const result = this.view.getUint32(this.offset, true);
        this.offset += 4;
        return result;
    }
    float32() {
        const result = this.view.getFloat32(this.offset, true);
        this.offset += 4;
        return result;
    }
    float64() {
        const result = this.view.getFloat64(this.offset, true);
        this.offset += 8;
        return result;
    }
    int64() {
        const offset = this.offset;
        this.offset += 8;
        return this.view.getBigInt64(offset, true);
    }
    uint64() {
        const offset = this.offset;
        this.offset += 8;
        return this.view.getBigUint64(offset, true);
    }
    time() {
        const offset = this.offset;
        this.offset += 8;
        const sec = this.view.getUint32(offset, true);
        const nsec = this.view.getUint32(offset + 4, true);
        return { sec, nsec };
    }
    duration() {
        return this.time();
    }
}
const findTypeByName = (types, name = "") => {
    let foundName = ""; // track name separately in a non-null variable to appease Flow
    const matches = types.filter((type) => {
        const typeName = type.name ?? "";
        // if the search is empty, return unnamed types
        if (!name) {
            return !typeName;
        }
        // return if the search is in the type name
        // or matches exactly if a fully-qualified name match is passed to us
        const nameEnd = name.includes("/") ? name : `/${name}`;
        if (typeName.endsWith(nameEnd)) {
            foundName = typeName;
            return true;
        }
        return false;
    });
    if (matches.length !== 1) {
        throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}.`);
    }
    return { ...matches[0], name: foundName };
};
const friendlyName = (name) => name.replace(/\//g, "_");
function toTypedArrayType(rosType) {
    switch (rosType) {
        case "int8":
            return "Int8Array";
        case "uint8":
            return "Uint8Array";
        case "int16":
            return "Int16Array";
        case "uint16":
            return "Uint16Array";
        case "int32":
            return "Int32Array";
        case "uint32":
            return "Uint32Array";
        case "int64":
            return "BigInt64Array";
        case "uint64":
            return "BigUint64Array";
        case "float32":
            return "Float32Array";
        case "float64":
            return "Float64Array";
        default:
            return undefined;
    }
}
export const createParsers = ({ definitions, options = {}, topLevelReaderKey, }) => {
    if (definitions.length === 0) {
        throw new Error(`no types given`);
    }
    const unnamedTypes = definitions.filter((type) => !type.name);
    if (unnamedTypes.length > 1) {
        throw new Error("multiple unnamed types");
    }
    const unnamedType = unnamedTypes.length > 0 ? unnamedTypes[0] : definitions[0];
    // keep only definitions with a name
    const namedTypes = definitions.filter((type) => !!type.name);
    const constructorBody = (type) => {
        const readerLines = [];
        type.definitions.forEach((def) => {
            if (def.isConstant === true) {
                return;
            }
            if (def.isArray === true) {
                // detect if typed array
                const typedArrayType = toTypedArrayType(def.type);
                if (typedArrayType != undefined) {
                    readerLines.push(`this.${def.name} = reader.typedArray(${String(def.arrayLength)}, ${typedArrayType});`);
                    return;
                }
                const lenField = `length_${def.name}`;
                // set a variable pointing to the parsed fixed array length
                // or read the byte indicating the dynamic length
                readerLines.push(`var ${lenField} = ${def.arrayLength != undefined ? def.arrayLength : "reader.uint32();"}`);
                // only allocate an array if there is a length - skips empty allocations
                const arrayName = `this.${def.name}`;
                // allocate the new array to a fixed length since we know it ahead of time
                readerLines.push(`${arrayName} = new Array(${lenField})`);
                // start the for-loop
                readerLines.push(`for (var i = 0; i < ${lenField}; i++) {`);
                // if the sub type is complex we need to allocate it and parse its values
                if (def.isComplex === true) {
                    const defType = findTypeByName(definitions, def.type);
                    // recursively call the constructor for the sub-type
                    readerLines.push(`  ${arrayName}[i] = new Record.${friendlyName(defType.name)}(reader);`);
                }
                else {
                    // if the subtype is not complex its a simple low-level reader operation
                    readerLines.push(`  ${arrayName}[i] = reader.${def.type}();`);
                }
                readerLines.push("}"); // close the for-loop
            }
            else if (def.isComplex === true) {
                const defType = findTypeByName(definitions, def.type);
                readerLines.push(`this.${def.name} = new Record.${friendlyName(defType.name)}(reader);`);
            }
            else {
                readerLines.push(`this.${def.name} = reader.${def.type}();`);
            }
        });
        if (options.freeze === true) {
            readerLines.push("Object.freeze(this);");
        }
        return readerLines.join("\n    ");
    };
    let js = `
  const builtReaders = new Map();
  var Record = function (reader) {
    ${constructorBody(unnamedType)}
  };
  builtReaders.set(topLevelReaderKey, Record);
  `;
    for (const type of namedTypes) {
        js += `
  Record.${friendlyName(type.name)} = function(reader) {
    ${constructorBody(type)}
  };
  builtReaders.set(${JSON.stringify(type.name)}, Record.${friendlyName(type.name)});
  `;
    }
    js += `return builtReaders;`;
    // eslint-disable-next-line @typescript-eslint/no-implied-eval,no-new-func
    return new Function("topLevelReaderKey", js)(topLevelReaderKey);
};
export class MessageReader {
    // takes an object message definition and returns
    // a message reader which can be used to read messages based
    // on the message definition
    constructor(definitions, options = {}) {
        this.reader = createParsers({ definitions, options, topLevelReaderKey: "<toplevel>" }).get("<toplevel>");
    }
    readMessage(buffer) {
        const standardReaders = new StandardTypeReader(buffer);
        return new this.reader(standardReaders);
    }
}
//# sourceMappingURL=MessageReader.js.map