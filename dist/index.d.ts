/// <reference types="node" />
/// <reference types="node" />
import { Stream, Duplex } from 'node:stream';
declare type DataType = string | Buffer | Stream;
interface Options {
    readable: boolean;
    writeable: boolean;
    maxbufsize: number;
    bufoverflow: number;
    frequence: number;
}
declare class MemoryStream extends Duplex {
    constructor(super_: any | undefined, data?: DataType | DataType[], options?: Options);
}
declare function MemoryStream(data: any, options: any): any;
declare namespace MemoryStream {
    var createReadStream: (data: any, options: any) => MemoryStream;
    var createWriteStream: (data: any, options: any) => MemoryStream;
}
export default MemoryStream;
