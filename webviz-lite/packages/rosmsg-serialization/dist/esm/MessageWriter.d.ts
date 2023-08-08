import { RosMsgDefinition } from "@foxglove/rosmsg";
export interface Time {
    sec: number;
    nsec: number;
}
export declare class MessageWriter {
    writer: (message: unknown, output: Uint8Array) => Uint8Array;
    byteSizeCalculator: (message: unknown) => number;
    constructor(definitions: RosMsgDefinition[]);
    calculateByteSize(message: unknown): number;
    writeMessage(message: unknown, output?: Uint8Array): Uint8Array;
}
//# sourceMappingURL=MessageWriter.d.ts.map