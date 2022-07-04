import jose  = require('jose');
import config = require('config');
const crypto = require('crypto');
import { KeyObject, JsonWebKey } from 'crypto';


export type secretKeyType = "aes" | "hmac";
export type secretKeyLength = 128 | 192 | 256;

type JWTtoken = string;
type pemString = string;
export interface KeyPair {
	publicKey: KeyObject,
	privateKey: KeyObject
}

const keyAlgorithm:string = config.get('security.keys.algorithm');
const jwtAlgorithmAsym:string = config.get('security.jwt.algorithmASym');
const jwtAlgorithmSym:string = config.get('security.jwt.algorithmSym');
const modulusLength:number = config.get('security.keys.modulusLength');

/**
 * Generate a new Public / Private key pair
 * @returns A new public / private key pair in PEM format
 */
export function generateDomainKeysPEM():Promise<KeyPair> {
	return new Promise((resolve, reject) => {
		crypto.generateKeyPair(keyAlgorithm, {
			modulusLength
		  }, (err:Error, publicKey:KeyObject, privateKey:KeyObject) => {
			if(err) reject(err);
			resolve({ publicKey, privateKey})
		  });
		  	
	})
}
/**
 * Generates a new symetrical secret key
 * @returns a secret symetrical key in jwk
 */
 export function generateSecretKey(type:secretKeyType = 'hmac', length:secretKeyLength = 256):Promise<KeyObject>{
	return new Promise(async (resolve, reject) => {
		crypto.generateKey(type, { length }, (err:Error, key: KeyObject) => {
			if(err) return reject(err);
			const jwk = key.export({format:'jwk'})
			if(!jwk.k) throw new Error('invalid jwt for secret key - no jwk.k key');
			const keyString = Buffer.from(jwk.k, 'base64url').toString('base64url');
			resolve(crypto.createSecretKey(keyString));
		})
	})
}

/**
 * Converts a key to a PEM string
 * @param key A public or private key object
 * @returns A PEM string
 */
export function keyToPEM(key: KeyObject):pemString{
	switch(key.type){
		case 'public':
			return key.export({type:'spki', format:'pem'}).toString();
			break;
		case 'private':
			return key.export({type:'pkcs8', format:'pem'}).toString();

		default:
			throw new Error(`Only public / private keys can be converted to PEM. Received type: ${key.type}`)
	}
}

/**
 * Converts an symmetrical Secret key object into a string
 * @param key The key object
 * @returns the key string
 */
export function keyToJWKstring(key: KeyObject):string {
	if (key.type !== 'secret') throw new Error('Only store secret keys as JWK');
	const jwk = key.export({format:'jwk'});
	if (!jwk.k) throw new Error('only store symmetrical key as JWK')
	return jwk.k;
}

export function stringToPublicKey(keystring:string):KeyObject {
	if (keystring.startsWith('-----BEGIN')) {
		return crypto.createPublicKey({key: keystring, format: 'pem'});
	} else {
		throw new Error('Not a valid PEM string')
	}
}
export function stringToPrivateKey(keystring:string):KeyObject {
	if (keystring.startsWith('-----BEGIN PRIVATE')) {
		return crypto.createPrivateKey({key: keystring, format: 'pem'});
	} else {
		throw new Error('Not a valid PRIVATE PEM string')
	}
}
export function stringToSecretKey(keystring:string):KeyObject {
	return crypto.createSecretKey(keystring);
}
/**
 * Converts a PEM encoded key string into a public key object
 * @param publicPEM the public key PEM string
 * @returns a public key
 */
export function convertPEMtoPublicKey(publicPEM: pemString):Promise<KeyObject>{
	return Promise.resolve(crypto.createPublicKey(publicPEM));
}

/**
 * Generates a new [JSON Web Token](https://jwt.io/)
 * @param issuer the "issuer" claim value
 * @param expiration the expire time. Use the format '1 day', '2 weeks', etc
 * @param key The key or secret you wish to sighn the JWT with
 * @param asym uses asymetrical algorithm by default, set `false` for use with symetrical secrets
 * @returns 
 */
 export function generateTokenJWT(issuer:string, expiration:string, key:KeyObject):Promise<JWTtoken> {
	
	const alg = key.type === 'secret' ? jwtAlgorithmSym : jwtAlgorithmAsym

	return new jose.SignJWT({})
		.setProtectedHeader({
			alg
		})
		.setIssuer(issuer)
		.setExpirationTime(expiration)
		.sign(key)
}

export function generateEncryptedTokenJWT(issuer:string, expiration:string, key:KeyObject):Promise<JWTtoken> {
	return new jose.EncryptJWT({})
		.setProtectedHeader({
			alg: 'dir',
			enc: 'A256GCM'
		})
		.setIssuer(issuer)
		.setExpirationTime(expiration)
		.encrypt(key)
}

export function validateTokenJWT(token: JWTtoken, key: KeyObject):Promise<any>{
	//return jose.jwtVerify(token, key).catch(err => err);
	const foo = jose.decodeJwt(token);
	return new Promise((resolve)=>resolve(foo));
}

export function decodeTokenJWT(){}

export function decryptTokenJwt(token:JWTtoken, key:KeyObject):Promise<jose.JWTDecryptResult>{
	return jose.jwtDecrypt(token, key);
}

