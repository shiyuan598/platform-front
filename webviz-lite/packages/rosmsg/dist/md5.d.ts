import { RosMsgDefinition } from "./types";
/**
 * Converts a ROS 1 message definition (http://wiki.ros.org/msg) into an md5 checksum using the same
 * approach as `gendeps --md5` from ROS 1.
 * @param msgDefs The ROS message definition to generate a checksum for, and all dependent
 * sub-messages
 * @returns An md5 checksum string
 */
export declare function md5(msgDefs: RosMsgDefinition[]): string;
//# sourceMappingURL=md5.d.ts.map