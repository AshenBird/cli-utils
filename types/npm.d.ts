import type { JSONRecord } from "@mcswift/types";
export declare class NpmPackage {
    root: string;
    constructor(root: string);
    private cache;
    get name(): string | number | true | JSONRecord | import("@mcswift/types").JSONValue[] | undefined;
    getInfo(): JSONRecord;
    setInfo(content: JSONRecord): void;
    static getInfo: (root?: string) => JSONRecord;
    static setInfo: (content: JSONRecord, root?: string) => void;
}
