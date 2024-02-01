export declare function subDocUpdateWithArray(currentDocs: any, newItems: any): any;
export declare function subDocUpdateWithObj(currentDoc: any, newItem: any): any;
export declare function encodeToken(token: any, password: any): Promise<string>;
export declare function decodeToken(token: string, password: string): Promise<any>;
export declare function isEmail(email: string): boolean;
export declare function ToBoolean(): PropertyDecorator;
export declare function generateId(prefix: string, id: number): string;
export declare function createSearchQuery(query: any): any;
export declare function randomEnumValue(enumeration: any): any;
