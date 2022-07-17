"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringDecoder = exports.MemoryReadableStream = exports.MemoryWritableStream = exports.MemoryStream = exports.MemoryDuplexStream = void 0;
const node_stream_1 = require("node:stream");
const node_util_1 = require("node:util");
function MemoryReadableStream(super_, data, options) {
    if (!(this instanceof MemoryReadableStream))
        return new MemoryReadableStream(data, options);
    MemoryReadableStream['super_'].call(this, options);
    this.init(data, options);
}
exports.MemoryReadableStream = MemoryReadableStream;
(0, node_util_1.inherits)(MemoryReadableStream, node_stream_1.Readable);
function MemoryWritableStream(data, options) {
    if (!(this instanceof MemoryWritableStream))
        return new MemoryWritableStream(data, options);
    MemoryWritableStream.super_.call(this, options);
    this.init(data, options);
}
exports.MemoryWritableStream = MemoryWritableStream;
(0, node_util_1.inherits)(MemoryWritableStream, node_stream_1.Writable);
function MemoryDuplexStream(data, options) {
    if (!(this instanceof MemoryDuplexStream))
        return new MemoryDuplexStream(data, options);
    MemoryDuplexStream.super_.call(this, options);
    this.init(data, options);
}
exports.MemoryDuplexStream = MemoryDuplexStream;
(0, node_util_1.inherits)(MemoryDuplexStream, node_stream_1.Duplex);
MemoryReadableStream.prototype.init =
    MemoryWritableStream.prototype.init =
        MemoryDuplexStream.prototype.init =
            function init(data, options) {
                var self = this;
                this.queue = [];
                if (data) {
                    if (!Array.isArray(data)) {
                        data = [data];
                    }
                    data.forEach((chunk) => {
                        if (!(chunk instanceof Buffer)) {
                            chunk = new Buffer.from(chunk);
                        }
                        self.queue.push(chunk);
                    });
                }
                const ofOptions = {};
                options = options || ofOptions;
                this.maxbufsize = options.hasOwnProperty('maxbufsize')
                    ? options.maxbufsize
                    : null;
                this.bufoverflow = options.hasOwnProperty('bufoverflow')
                    ? options.bufoverflow
                    : null;
                this.frequence = options.hasOwnProperty('frequence')
                    ? options.frequence
                    : null;
            };
function MemoryStream(data, options) {
    const ofOptions = {};
    if (!(this instanceof MemoryStream))
        return new MemoryStream(data, options);
    options = options || ofOptions;
    var readable = options.hasOwnProperty('readable') ? options.readable : true, writable = options.hasOwnProperty('writable') ? options.writable : true;
    if (readable && writable) {
        return new MemoryDuplexStream(data, options);
    }
    else if (readable) {
        return new MemoryDuplexStream(data, options);
    }
    else if (writable) {
        return new MemoryDuplexStream(data, options);
    }
    else {
        throw new Error('Unknown stream type  Readable, Writable or Duplex ');
    }
}
exports.MemoryStream = MemoryStream;
MemoryStream.createReadStream = function (data, options) {
    const ofOptions = {};
    options = options || ofOptions;
    options.readable = true;
    options.writable = false;
    return new MemoryStream(data, options);
};
MemoryStream.createWriteStream = function (data, options) {
    const ofOptions = {};
    options = options || ofOptions;
    options.readable = false;
    options.writable = true;
    return new MemoryStream(data, options);
};
MemoryReadableStream.prototype._read = MemoryDuplexStream.prototype._read =
    function _read(n) {
        let self = this, frequence = self.frequence || 0, wait_data = this instanceof node_stream_1.Duplex && !this._writableState.finished ? true : false;
        if (!this.queue.length && !wait_data) {
            this.push(null);
        }
        else if (this.queue.length) {
            setTimeout(function () {
                if (self.queue.length) {
                    var chunk = self.queue.shift();
                    if (chunk && !self._readableState.ended && !self.push(chunk)) {
                        self.queue.unshift(chunk);
                    }
                }
            }, frequence);
        }
    };
MemoryWritableStream.prototype._write = MemoryDuplexStream.prototype._write =
    function _write(chunk, encoding, cb) {
        var decoder = undefined;
        try {
            decoder =
                this.decodeStrings && encoding ? new StringDecoder(encoding) : null;
        }
        catch (err) {
            return cb(err);
        }
        var decoded_chunk = decoder ? decoder['write'](chunk) : chunk, queue_size = this._getQueueSize(), chunk_size = decoded_chunk.length;
        if (this.maxbufsize && queue_size + chunk_size > this.maxbufsize) {
            return this.bufoverflow
                ? cb(`[Alert]: Buffer overflowed (${this.bufoverflow}/${queue_size})`)
                : cb();
        }
        if (this instanceof node_stream_1.Duplex) {
            while (this.queue.length) {
                this.push(this.queue.shift());
            }
            this.push(decoded_chunk);
        }
        else {
            this.queue.push(decoded_chunk);
        }
        cb();
    };
MemoryDuplexStream.prototype.end = function (super_, chunk, encoding, cb) {
    let self = this;
    return MemoryDuplexStream.super_.prototype.end.call(this, chunk, encoding, () => {
        self.push(null);
        if (cb)
            cb();
    });
};
MemoryReadableStream.prototype._getQueueSize =
    MemoryWritableStream.prototype._getQueueSize =
        MemoryDuplexStream.prototype._getQueueSize =
            function () {
                let queuesize = 0, i;
                for (i = 0; i < this.queue.length; i++) {
                    queuesize += Array.isArray(this.queue[i])
                        ? this.queue[i][0].length
                        : this.queue[i].length;
                }
                return queuesize;
            };
MemoryWritableStream.prototype.toString =
    MemoryDuplexStream.prototype.toString =
        MemoryReadableStream.prototype.toString =
            MemoryWritableStream.prototype.getAll =
                MemoryDuplexStream.prototype.getAll =
                    MemoryReadableStream.prototype.getAll =
                        function () {
                            let self = this, ret = '';
                            this.queue.forEach((data) => {
                                ret += data;
                            });
                            return ret;
                        };
MemoryWritableStream.prototype.toBuffer =
    MemoryDuplexStream.prototype.toBuffer =
        MemoryReadableStream.prototype.toBuffer =
            function () {
                let buffer = new Buffer.from(this._getQueueSize()), currentOffset = 0;
                this.queue.forEach((data) => {
                    let data_buffer = data instanceof Buffer ? data : new Buffer.from(data);
                    data_buffer.copy(buffer, currentOffset);
                    currentOffset += data.length;
                });
                return buffer;
            };
