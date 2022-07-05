import config = require('config');
const crypto = require('crypto');
import { KeyObject } from 'crypto';

type publicPEM = `-----BEGIN PUBLIC${string}}`;
type privatePEM = `-----BEGIN PRIVATE${string}}`;

type KeyPair = {
	publicKey: KeyObject,
	privateKey: KeyObject
}

const keyAlgorithm: string = config.get('security.keys.algorithm');
const modulusLength: number = config.get('security.keys.modulusLength');


/**
 * Generate a new Public / Private key pair
 * 
 * @param alg 
 * @param len 
 * @returns A new public / private key pair in PEM format
 */
export function generateKeyPair(alg = keyAlgorithm, len = modulusLength): Promise<KeyPair> {
	return new Promise((resolve, reject) => {
		crypto.generateKeyPair(
			alg,
			{ modulusLength: len },
			(err: Error, publicKey: KeyObject, privateKey: KeyObject) => {
				if (err) reject(err);
				resolve({ publicKey, privateKey })
			});
	})
}

/**
 * Converts a key to a PEM string
 * @param key A public or private key object
 * @returns A PEM string
 */
export function keyToPEM(key: KeyObject): publicPEM | privatePEM {
	switch (key.type) {
		case 'public':
			return key.export({ type: 'spki', format: 'pem' }) as publicPEM;
			break;
		case 'private':
			return key.export({ type: 'pkcs8', format: 'pem' }) as privatePEM;
		default:
			throw new Error(`Only public / private keys can be converted to PEM. Received type: ${key.type}`)
	}
}

/**
 * Converts a PEM encoded key string into a public key object
 * @param PEM the public key PEM string
 * @returns a public key
 */
export function pemToPublicKey(PEM: publicPEM | privatePEM): KeyObject {
	if (PEM.startsWith('-----BEGIN')) {
		return crypto.createPublicKey({ key: PEM, format: 'pem' });
	} else {
		throw new Error('Not a valid PEM string')
	}
}

/**
 * Converts a PEM encoded key string into a privatekey object
 * @param privatePEM 
 * @returns a private key
 */
export function pemToPrivateKey(privatePEM: privatePEM): KeyObject {
	if (privatePEM.startsWith('-----BEGIN PRIVATE')) {
		return crypto.createPrivateKey({ key: privatePEM, format: 'pem' });
	} else {
		throw new Error('Not a valid PRIVATE PEM string')
	}
}

