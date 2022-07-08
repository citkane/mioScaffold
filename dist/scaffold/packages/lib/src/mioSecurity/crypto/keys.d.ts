/**
 * #### The base cryptographic utilities for mio.
 * This should be limited to use of the native
 * <a href="https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html" target="_blank">node:crypto</a>
 * utils.
 *
 * @module
 */
/// <reference types="node" />
import type { KeyObject } from 'crypto';
declare const _default: {
    generateKeyPair: typeof generateKeyPair;
    keyToPEM: typeof keyToPEM;
    pemToPublicKey: typeof pemToPublicKey;
    pemToPrivateKey: typeof pemToPrivateKey;
};
export default _default;
/** The default NodeJS 'KeyOject' with mio specific allowed type methods */
export declare type keyObject = KeyObject & {
    equals: (KeyObject: KeyObject) => boolean;
};
export declare type publicPEM = `-----BEGIN PUBLIC${string}}`;
export declare type privatePEM = `-----BEGIN PRIVATE${string}}`;
export declare type KeyPair = {
    publicKey: keyObject;
    privateKey: keyObject;
};
/**
 * Generate a new Public / Private key pair
 *
 * @param alg
 * @param len
 * @returns A new public / private key pair in PEM format
 *
 * @group Key Generation
 */
export declare function generateKeyPair(alg?: string, len?: number): Promise<KeyPair>;
/**
 * Converts a key to a PEM string
 * @param key A public or private key object
 * @returns A PEM string
 *
 * @group Key Conversion
 */
export declare function keyToPEM(key: keyObject): publicPEM | privatePEM | null;
/**
 * Converts a PEM encoded key string into a public key object
 * @param PEM the public key PEM string
 * @returns a public key
 *
 * @group Key Conversion
 */
export declare function pemToPublicKey(PEM: publicPEM | privatePEM): keyObject;
/**
 * Converts a PEM encoded key string into a privatekey object
 * @param privatePEM
 * @returns a private key
 *
 * @group Key Conversion
 */
export declare function pemToPrivateKey(privatePEM: privatePEM): keyObject;
//# sourceMappingURL=keys.d.ts.map