import axios from 'axios';

const Api = {
    ROOT: 'http://localhost:3001',

    async getHash() {
        return (await axios.get(Api.ROOT + '/hash')).data;
    },

    async getData() {
        return (await axios.get(Api.ROOT)).data;
    },
};

export default Api;
