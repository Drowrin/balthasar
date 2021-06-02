import axios from 'axios';

export const DOMAIN = 'localhost';
export const PORT = 3001;
export const WSPORT = 3002;
export const ROOT = `http://${DOMAIN}:${PORT}`;

export async function getHash() {
    return (await axios.get(ROOT + '/hash')).data;
}

export async function getData() {
    return (await axios.get(ROOT)).data;
}

export function webSocket() {
    return new WebSocket(`ws://${DOMAIN}:${WSPORT}`);
}
