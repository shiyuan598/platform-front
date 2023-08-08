"use strict";
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rosmsg_1 = require("@foxglove/rosmsg");
const MessageReader_1 = require("./MessageReader");
const messageReaderTests_1 = (0, tslib_1.__importDefault)(require("./fixtures/messageReaderTests"));
const getStringBuffer = (str) => {
    const data = Buffer.from(str, "utf8");
    const len = Buffer.alloc(4);
    len.writeInt32LE(data.byteLength, 0);
    return Uint8Array.from([...len, ...data]);
};
describe("MessageReader", () => {
    it.each(messageReaderTests_1.default)("should deserialize %s", (msgDef, arr, expected) => {
        const buffer = Uint8Array.from(arr);
        const reader = new MessageReader_1.MessageReader((0, rosmsg_1.parse)(msgDef));
        // read aligned array
        {
            const read = reader.readMessage(buffer);
            expect(read).toEqual(expected);
        }
        // read offset array
        {
            const offset = 4;
            const fullArr = new Uint8Array(buffer.length + offset);
            fullArr.set(buffer, offset);
            const read = reader.readMessage(new Uint8Array(fullArr.buffer, fullArr.byteOffset + offset, fullArr.byteLength - offset));
            expect(read).toEqual(expected);
        }
    });
    it("freezes the resulting message if requested", () => {
        // strict mode is required for Object.freeze to throw
        "use strict";
        const reader = new MessageReader_1.MessageReader((0, rosmsg_1.parse)("string firstName \n string lastName\nuint16 age"), {
            freeze: true,
        });
        const buffer = Buffer.concat([
            getStringBuffer("foo"),
            getStringBuffer("bar"),
            new Uint8Array([0x05, 0x00]),
        ]);
        const output = reader.readMessage(buffer);
        expect(output).toEqual({ firstName: "foo", lastName: "bar", age: 5 });
        expect(() => {
            output.firstName = "boooo";
        }).toThrow();
    });
});
//# sourceMappingURL=MessageReader.test.js.map