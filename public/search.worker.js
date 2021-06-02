importScripts('https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js');

var fuse;
var lastSearch;

onmessage = function (e) {
    if (e.data.fuse !== undefined) {
        let data = JSON.parse(e.data.fuse);
        fuse = new Fuse(data.values, data.options, Fuse.parseIndex(data.index));
        console.log('Search Worker loaded successfuly!');

        if (lastSearch) {
            postMessage(fuse.search(lastSearch));
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
