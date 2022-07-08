/**
 * #### Hashing and other password related utilities
 * uses the <a href="https://github.com/kelektiv/node.bcrypt.js" target="_blank">bcrypt</a> library.
 *
 * @module
 */
declare const _default: {
    createHashFromPassword: typeof createHashFromPassword;
    validatePasswordFromHash: typeof validatePasswordFromHash;
};
export default _default;
/**
 * Creates a hash from a password string for storage in the user database
 * @param password
 * @param rounds
 * @returns hash string
 *
 * @group Hashing Functions
 */
export declare function createHashFromPassword(password: string, rounds?: number): Promise<string>;
/**
 * Validate a hash against a password string
 * @param password
 * @param hash
 * @returns
 *
 * @group Validation Functions
 */
export declare function validatePasswordFromHash(password: string, hash: string): Promise<boolean>;
//# sourceMappingURL=passwords.d.ts.map