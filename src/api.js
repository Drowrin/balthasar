import axios from 'axios';

export const DOMAIN = import.meta.env.VITE_CASPER_DOMAIN;
export const PORT = import.meta.env.VITE_CASPER_PORT;
export const ROOT = `http://${DOMAIN}:${PORT}`;
export const WSPORT = import.meta.env.VITE_CASPER_WS_PORT;
export const WSROOT = `ws://${DOMAIN}:${WSPORT}`;

function error() {
    console.log('Error communicating with Casper API:');
    console.err(err.code);
    console.err(err.message);
    console.err(err.stack);
}

export async function getHash() {
    return (await axios.get(ROOT + '/hash').catch(error)).data;
}

export async function getData() {
    return (await axios.get(ROOT).catch(error)).data;
}

export function webSocket() {
    return new WebSocket(WSROOT);
}
