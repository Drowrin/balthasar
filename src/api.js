import axios from 'axios';

export const DOMAIN = import.meta.env.VITE_CASPER_DOMAIN;
export const PORT = import.meta.env.VITE_CASPER_PORT;
export const ROOT = `http://${DOMAIN}:${PORT}`;
export const WSPORT = import.meta.env.VITE_CASPER_WS_PORT;
export const WSROOT = `ws://${DOMAIN}:${WSPORT}`;

export async function getHash() {
    return (await axios.get(ROOT + '/hash')).data;
}

export async function getData() {
    return (await axios.get(ROOT)).data;
}

export function webSocket() {
    return new WebSocket(WSROOT);
}
