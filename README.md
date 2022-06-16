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


This module supports all methods, events, and variables that describe the [abstract interface](http://nodejs.org/docs/latest/api/streams.html).


## License 

Universal Permissive License v1.0 / UPL-1.0

the UPL is a highly permissive license, including both copyright and patent licenses, which permits use and relicensing under both copyleft and commercial terms, and also facilitates use as a contributor license agreement.

It was originally borne out of a discussion in the Java Community Process around what it would take to permit collaboration on JSR reference implementations in open source forges without the necessity of collaborators signing the JSPA or an Oracle Contributor Agreement. To accommodate the broadest possible use case, the license needed to include an express patent license and to be broadly agreed to be GPLv2, GPLv2+Classpath Exception, CDDL, and commercial license compatible, including the ability to cut and paste code between modules, and while it is almost universally agreed among those knowledgeable in FOSS licensing that license proliferation is something to be avoided without good cause, since a license meeting these relatively simple and obvious criteria did not exist, it was decided to draft one.

Drafting started with the MIT license, and after a lot of discussion with other open source lawyers, developers, members of the Java Community Process Executive Committee, and reviewers and board members of the Open Source Initiative, and several rounds of revision, finally arrived at the vetted license text you see here. The license was approved by the OSI as conforming with the Open Source Definition and non-duplicative of existing permissive licenses in February 2015.

**Clear patent protection.** The UPL is a broad permissive license including both a copyright license and an express patent license, covering at least a version licensed by someone under the license (for example a distributor) and/or a version someone contributed to even if they never distribute the whole. (The reason the latter is needed is discussed below.) By virtue of the unambiguous patent license, the UPL is materially clearer with respect to the rights licensed and likely broader than either the MIT or BSD licenses.

**Clear & simplified relicensing**. The UPL expressly permits sublicensing under either the UPL or under other terms, which clearly allows someone to relicense code received under the UPL either on copyleft terms, on proprietary terms, or otherwise, thus permitting maximum flexibility in reuse.
Reduced overhead in source files. The UPL expressly permits use of the license without including a full copy of the text, which is useful for JavaScript or other cases where minimizing space consumed by licenses is desired - see below for our recommendation of how to apply the license or include proper attribution without the full text.