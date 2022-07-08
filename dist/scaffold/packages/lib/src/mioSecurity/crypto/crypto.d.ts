/**
 * #### Utilities using cryptogrophy for security purposes
 * These should stay as close to bare native utilities as practical.
 *
 * Current dependencies:
 * - <a href="https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html" target="_blank">node:crypto</a>
 * - <a href="https://github.com/panva/jose" target="_blank">jose</a>
 * - <a href="https://github.com/kelektiv/node.bcrypt.js" target="_blank">bcrypt</a>
 *
 * @module
 */
import * as jwt from './jwt';
import * as keys from './keys';
import * as passwords from './passwords';
declare const _default: {
    jwt: typeof jwt;
    keys: typeof keys;
    passwords: typeof passwords;
};
export default _default;
export { jwt };
export { keys };
export { passwords };
//# sourceMappingURL=crypto.d.ts.map