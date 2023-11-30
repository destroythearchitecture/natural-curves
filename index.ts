import { generateKeyPair } from 'curve25519-js'

async function digestMessage(message: string) {
    const msgUint8 = new TextEncoder().encode(message)
    const hashBuffer = await (global as any).crypto.subtle.digest("SHA-256", msgUint8)
    const hashUint8 = new Uint8Array(hashBuffer)
    return hashUint8
}

function uint8ArrayToBase64(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

const keys = generateKeyPair(await digestMessage(process.argv.slice(2)[0]))

console.log(uint8ArrayToBase64(keys.public))