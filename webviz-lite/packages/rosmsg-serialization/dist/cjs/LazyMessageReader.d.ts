import { RosMsgDefinition } from "@foxglove/rosmsg";
import buildReader from "./buildReader";
declare type LazyMessage<T> = T & {
    toJSON: () => T;
};
export declare class LazyMessageReader<T = unknown> {
    readerImpl: ReturnType<typeof buildReader>;
    definitions: RosMsgDefinition[];
    constructor(definitions: RosMsgDefinition[]);
    size(buffer: ArrayBufferView): number;
    source(): string;
    readMessage<R = T>(buffer: ArrayBufferView): LazyMessage<R>;
}
export {};
//# sourceMappingURL=LazyMessageReader.d.ts.map