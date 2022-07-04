import jose  = require('jose');
import config = require('config');
const crypto = require('crypto');
import { KeyObject } from 'crypto';

export type JWTtoken = string;
export type secretKeyType = "aes" | "hmac";
export type secretKeyLength = 128 | 192 | 256;

type pemString = string;
export interface pemKeyPair {
	publicKeyPEM: string,
	privateKeyPEM: string
}

const keyAlgorithm:string = config.get('security.keys.algorithm');
const jwtAlgorithmASym:string = config.get('security.jwt.algorithmASym');
const jwtAlgorithmSym:string = config.get('security.jwt.algorithmSym');
const modulusLength:number = config.get('security.keys.modulusLength');

/**
 * Generate a new Public / Private key pair
 * @returns A new public / private key pair in PEM format
 */
export function generateDomainKeysPEM():Promise<pemKeyPair> {
	return new Promise((resolve, reject) => {
		crypto.generateKeyPair(keyAlgorithm, {
			modulusLength,
			publicKeyEncoding: {
			  type: 'spki',
			  format: 'pem'
			},
			privateKeyEncoding: {
			  type: 'pkcs8',
			  format: 'pem',
			  //cipher: 'aes-256-cbc',
			  //passphrase: 'top secret'
			}
		  }, (err:Error, publicKeyPEM:pemString, privateKeyPEM:pemString) => {
			if(err) reject(err);
			resolve({ publicKeyPEM, privateKeyPEM })
		  });
		  	
	})
}
/**
 * Converts a PEM encoded key string into a private key object
 * @param privatePEM the private key PEM string
 * @returns a private key
 */
 export function convertPEMtoPrivateKey(privatePEM: pemString):Promise<KeyObject>{
	return Promise.resolve(crypto.createPrivateKey(privatePEM));
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
 * Generates a new symetrical secret key
 * @returns a secret symetrical key
 */
export function generateSecretKey(type:secretKeyType = 'hmac', length:secretKeyLength = 256):Promise<KeyObject>{
	return new Promise(async (resolve, reject) => {
		crypto.generateKey(type, { length }, (err:Error, key: KeyObject) => {
			if(err) return reject(err);
			resolve(key);
		})
	})
}
/**
 * Generates a new [JSON Web Token](https://jwt.io/)
 * @param issuer the "issuer" claim value
 * @param expiration the expire time. Use the format '1 day', '2 weeks', etc
 * @param key The key or secret you wish to sighn the JWT with
 * @param asym uses asymetrical algorithm by default, set `false` for use with symetrical secrets
 * @returns 
 */
 export function generateTokenJWT(issuer:string, expiration:string, key:KeyObject, asym = true):Promise<JWTtoken> {
	
	const alg = key.type === 'secret' ? jwtAlgorithmSym : jwtAlgorithmASym

	return new jose.SignJWT({})
		.setProtectedHeader({
			alg
		})
		.setIssuer(issuer)
		.setExpirationTime(expiration)
		.sign(key)
}

export function validateTokenJWT(token: JWTtoken, key: KeyObject):Promise<jose.JWTVerifyResult>{
	return jose.jwtVerify(token, key)
}

export function decodeTokenJWT(){}

