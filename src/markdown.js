import { Melchior } from 'melchior';

export default function (manifest) {
    let melchior = new Melchior();

    melchior.entityLink.replace = function (_, id) {
        let name = manifest[id]?.name || id;
        let description = manifest[id]?.description;
        let path = id.replace('.', '/');
        return `<a href="/${path}" class="card-block" data-tippy-content="${description}" style="margin-right: 0">${name}</a>`;
    };

    return melchior.converter();
}
