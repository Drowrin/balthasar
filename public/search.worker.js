importScripts('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js');

var fuse;

onmessage = function (e) {
    if (e.data.fuse !== undefined) {
        console.log('Worker loading Fuse...');
        fuse = new Fuse(
            JSON.parse(e.data.fuse.values),
            e.data.fuse.options,
            Fuse.parseIndex(e.data.fuse.index)
        );
        console.log('Worker loaded Fuse successfuly!');
    } else if (fuse !== undefined) {
        postMessage(fuse.search(e.data));
    }
};
