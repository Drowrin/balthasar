importScripts('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js');

var fuse;

onmessage = function(e) {
    console.log("Message received from main script!");
    console.log(e);

    if (e.data.fuse !== undefined) {
        fuse = new Fuse(
            JSON.parse(e.data.fuse.values),
            e.data.fuse.options,
            Fuse.parseIndex(e.data.fuse.index),
        );
    }
    
    else if (fuse !== undefined) {
        postMessage(fuse.search(e.data));
    }
}