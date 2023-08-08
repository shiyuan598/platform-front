"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rosmsg_1 = require("@foxglove/rosmsg");
const parser_babel_1 = (0, tslib_1.__importDefault)(require("prettier/parser-babel"));
const standalone_1 = (0, tslib_1.__importDefault)(require("prettier/standalone"));
const LazyMessageReader_1 = require("./LazyMessageReader");
const messageReaderTests_1 = (0, tslib_1.__importDefault)(require("./fixtures/messageReaderTests"));
describe("LazyReader", () => {
    it.each(messageReaderTests_1.default)("should deserialize %s", (msgDef, arr, expected) => {
        const buffer = Uint8Array.from(arr);
        const reader = new LazyMessageReader_1.LazyMessageReader((0, rosmsg_1.parse)(msgDef));
        // allows for easier review of the generated parser source
        const source = reader.source();
        expect(standalone_1.default.format(source, { parser: "babel", plugins: [parser_babel_1.default] })).toMatchSnapshot(msgDef);
        // read aligned array
        {
            const read = reader.readMessage(buffer);
            // check that our reader expected size matches the buffer size
            expect(reader.size(buffer)).toEqual(buffer.length);
            // check that our message matches the full object
            const obj = read.toJSON();
            expect(read.toJSON()).toEqual(expected);
            // manually read each field to ensure lazy field access works
            for (const key in obj) {
                if (typeof expected[key] === "object") {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(read[key]).toMatchObject(expected[key]); // eslint-disable-line @typescript-eslint/no-explicit-any
                }
                else {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(read[key]).toEqual(expected[key]);
                }
            }
        }
        // read offset array
        {
            const offset = 7;
            const fullArr = new Uint8Array(buffer.length + offset);
            fullArr.set(buffer, offset);
            const read = reader.readMessage(new Uint8Array(fullArr.buffer, fullArr.byteOffset + offset, fullArr.byteLength - offset));
            expect(reader.size(buffer)).toEqual(buffer.length);
            const obj = read.toJSON();
            expect(obj).toEqual(expected);
            // manually read each field to ensure lazy field access works
            for (const key in obj) {
                if (typeof expected[key] === "object") {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(read[key]).toMatchObject(expected[key]); // eslint-disable-line @typescript-eslint/no-explicit-any
                }
                else {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(read[key]).toEqual(expected[key]);
                }
            }
        }
    });
    it("should support toJSON for individual array fields", () => {
        const msgDef = `CustomType[3] custom
    ============
    MSG: custom_type/CustomType
    uint8 first`;
        const arr = [0x02, 0x03, 0x04];
        const buffer = Uint8Array.from(arr);
        const reader = new LazyMessageReader_1.LazyMessageReader((0, rosmsg_1.parse)(msgDef));
        const read = reader.readMessage(buffer);
        expect(read.custom[0]?.toJSON()).toEqual({ first: 2 });
        expect(read.custom[1]?.toJSON()).toEqual({ first: 3 });
        expect(read.custom[2]?.toJSON()).toEqual({ first: 4 });
    });
    it("should support toJSON for individual fields", () => {
        const msgDef = `CustomType custom1
    CustomType custom2
    ============
    MSG: custom_type/CustomType
    uint8 first`;
        const arr = [0x03, 0x07];
        const buffer = Uint8Array.from(arr);
        const reader = new LazyMessageReader_1.LazyMessageReader((0, rosmsg_1.parse)(msgDef));
        const read = reader.readMessage(buffer);
        expect(read.custom1.toJSON()).toEqual({ first: 3 });
        expect(read.custom2.toJSON()).toEqual({ first: 7 });
    });
});
//# sourceMappingURL=LazyMessageReader.test.js.map