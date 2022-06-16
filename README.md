# `memorystream2` 


>  a memory stream that can be used to write to a file.

memory stream adopts all the same methods and events as node's Stream implementation

## API
## new MemoryStream([data], [options])
Returns a new MemoryStream object readable and writeable by default.

* `data`_(optional)_: initial data string or buffer or array for the stream 
* `options`_(optional)_: plain object with next options

        readable : true - false if stream isn't readable
        writable : true - false if stream isn't writable
        maxbufsize : null - if buffer size bigger or equal `maxbufsize` 
                           then every write call will return false
        bufoveflow : null - if buffer size bigger or equal `bufoveflow` 
                           then every write call will emit `error` event with error Buffer overflow
        frequence : null - delay between emit `data` event in ms


memorystream2 adopts all the same methods and events as node's Stream implementation. Including:

* readable
* writable
* Event: 'end'
* Event: 'data'
* Event: 'error'
* Event: 'drain'
* Event: 'pipe'
* write()
* pause()
* resume()
* destroy()
* destroySoon()
* setEncoding()
* end()
* pipe()
* toString() - get all data from internal buffers


This module supports all methods, events, variables with describe [abstract interface](http://nodejs.org/docs/latest/api/streams.html).



