export declare type RosDefaultValue = string | number | bigint | boolean | string[] | number[] | bigint[] | boolean[] | undefined;
export declare type RosMsgField = {
    type: string;
    name: string;
    isComplex?: boolean;
    isArray?: boolean;
    arrayLength?: number | undefined;
    isConstant?: boolean;
    value?: string | number | bigint | boolean | undefined;
    valueText?: string;
    upperBound?: number;
    arrayUpperBound?: number;
    defaultValue?: RosDefaultValue;
};
export declare type RosMsgDefinition = {
    name?: string;
    definitions: RosMsgField[];
};
//# sourceMappingURL=types.d.ts.map