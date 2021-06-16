import { Melchior } from 'melchior';

export default function (manifest) {
    let melchior = new Melchior();

    melchior.entityLink.replace = function (_, id) {
        let entity = manifest[id];
        let name = entity?.name || id;
        let path = id.replace('.', '/');
        let dataID = entity === undefined ? '' : `data-id="${id}"`;
        return `<router-link :to="'/${path}'" class="card-block" ${dataID} style="margin-right: 0">${name}</router-link>`;
    };

    return melchior.converter();
}
