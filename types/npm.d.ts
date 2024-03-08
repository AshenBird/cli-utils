import type { JSONRecord } from "@mcswift/types";
export declare class NpmPackage {
    root: string;
    constructor(root: string);
    getInfo(): JSONRecord;
    setInfo(content: JSONRecord): void;
    static getInfo: (root?: string) => JSONRecord;
    static setInfo: (content: JSONRecord, root?: string) => void;
}
