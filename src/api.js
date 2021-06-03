import axios from 'axios';

export const ROOT = import.meta.env.VITE_CASPER;
export const WS = import.meta.env.VITE_CASPER_WS;

function error(err) {
    console.log('Error communicating with Casper API:');
    console.error(err.code);
    console.error(err.message);
    console.error(err.stack);
}

export async function getHash() {
    return (await axios.get(ROOT + '/hash').catch(error)).data;
}

export async function getData() {
    return (await axios.get(ROOT).catch(error)).data;
}

export function webSocket() {
    return new WebSocket(WS);
}
