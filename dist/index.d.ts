/// <reference types="@types/node" />
/// <reference types="@types/node" />
import { Stream, Duplex } from 'node:stream';
declare type DataType = string | Buffer | Stream;
interface Options {
    readable: boolean;
    writeable: boolean;
    maxbufsize: number;
    bufoverflow: number;
    frequence: number;
}
declare class StringDecoder {
    constructor(encoding?: BufferEncoding | string);
    write(buffer: Buffer): string;
    end(buffer?: Buffer): string;
}
declare class MemoryStream extends Duplex {
    constructor(super_: (data?: DataType | DataType[], options?: Options) => void, data?: DataType | DataType[], options?: Options);
}
declare function MemoryReadableStream(super_: any, data: any, options: any): any;
declare function MemoryWritableStream(data: any, options: any): any;
declare function MemoryDuplexStream(data: any, options: any): any;
declare function MemoryStream(data: any, options: any): any;
declare namespace MemoryStream {
    var createReadStream: (data: any, options: any) => MemoryStream;
    var createWriteStream: (data: any, options: any) => MemoryStream;
}
export { MemoryDuplexStream, MemoryStream, MemoryWritableStream, MemoryReadableStream, StringDecoder, };
