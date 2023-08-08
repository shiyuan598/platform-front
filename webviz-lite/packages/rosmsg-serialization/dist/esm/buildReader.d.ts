import { RosMsgDefinition } from "@foxglove/rosmsg";
interface SerializedMessageReader {
    build: (view: DataView, offset?: number) => unknown;
    size: (view: DataView, offset?: number) => number;
    source: () => string;
}
export default function buildReader(definitions: readonly RosMsgDefinition[]): SerializedMessageReader;
export {};
//# sourceMappingURL=buildReader.d.ts.map