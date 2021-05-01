importScripts('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js');

var fuse;
var lastSearch;

onmessage = function (e) {
    if (e.data.fuse !== undefined) {
        fuse = new Fuse(
            JSON.parse(e.data.fuse.values),
            e.data.fuse.options,
            Fuse.parseIndex(JSON.parse(e.data.fuse.index))
        );
        console.log('Search Worker loaded successfuly!');

        if (lastSearch) {
            postMessage(fuse.search(e.data));
        }
    } else if (e.data.reset) {
        lastSearch = undefined;
    } else {
        if (e.data != lastSearch) {
            lastSearch = e.data;
            if (fuse !== undefined) {
                postMessage(fuse.search(e.data));
            }
        }
    }
};
