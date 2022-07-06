/**
 * #### Hashing and other password related utilities
 * uses the <a href="https://github.com/kelektiv/node.bcrypt.js" target="_blank">bcrypt</a> library.
 * 
 * @module
 */

import bcrypt from 'bcrypt';
import config from 'config';

const saltRounds: number = config.get('security.hash.saltRounds');

/**
 * Creates a hash from a password string for storage in the user database
 * @param password 
 * @param rounds 
 * @returns hash string
 * 
 * @group Hashing Functions
 */
export function createHashFromPassword(password: string, rounds: number = saltRounds): Promise<string>{
	return bcrypt.hash(password, rounds);
}

/**
 * Validate a hash against a password string
 * @param password 
 * @param hash 
 * @returns
 * 
 * @group Validation Functions
 */
export function validatePasswordFromHash(password: string, hash: string) :Promise<boolean>{
	return bcrypt.compare(password, hash);
}