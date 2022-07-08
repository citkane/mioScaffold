"use strict";
/**
 * #### The base cryptographic utilities for mio.
 * This should be limited to use of the native
 * <a href="https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html" target="_blank">node:crypto</a>
 * utils.
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.pemToPrivateKey = exports.pemToPublicKey = exports.keyToPEM = exports.generateKeyPair = void 0;
process.env['OPENSSL_CONF'] = '/dev/null'; /* Workaround for https://github.com/nodejs/node/discussions/43184 */
var config_1 = __importDefault(require("@mio/config"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
var crypto = require('crypto');
exports["default"] = {
    generateKeyPair: generateKeyPair,
    keyToPEM: keyToPEM,
    pemToPublicKey: pemToPublicKey,
    pemToPrivateKey: pemToPrivateKey
};
var keyAlgorithm = config_1["default"].get('security.keys.algorithm');
var modulusLength = config_1["default"].get('security.keys.modulusLength');
/**
 * Generate a new Public / Private key pair
 *
 * @param alg
 * @param len
 * @returns A new public / private key pair in PEM format
 *
 * @group Key Generation
 */
function generateKeyPair(alg, len) {
    if (alg === void 0) { alg = keyAlgorithm; }
    if (len === void 0) { len = modulusLength; }
    return new Promise(function (resolve, reject) {
        crypto.generateKeyPair(alg, { modulusLength: len }, function (err, publicKey, privateKey) {
            return err ? reject(err) : resolve({ publicKey: publicKey, privateKey: privateKey });
        });
    });
}
exports.generateKeyPair = generateKeyPair;
/**
 * Converts a key to a PEM string
 * @param key A public or private key object
 * @returns A PEM string
 *
 * @group Key Conversion
 */
function keyToPEM(key) {
    if (key.type !== 'private' && key.type !== 'public')
        throw Error("Only public / private keys can be converted to PEM. Received type: ".concat(key.type));
    var type = key.type === 'private' ? 'pkcs8' : 'spki';
    return key["export"]({ type: type, format: 'pem' });
}
exports.keyToPEM = keyToPEM;
/**
 * Converts a PEM encoded key string into a public key object
 * @param PEM the public key PEM string
 * @returns a public key
 *
 * @group Key Conversion
 */
function pemToPublicKey(PEM) {
    return crypto.createPublicKey({ key: PEM, format: 'pem' });
}
exports.pemToPublicKey = pemToPublicKey;
/**
 * Converts a PEM encoded key string into a privatekey object
 * @param privatePEM
 * @returns a private key
 *
 * @group Key Conversion
 */
function pemToPrivateKey(privatePEM) {
    if (privatePEM.startsWith('-----BEGIN PRIVATE')) {
        return crypto.createPrivateKey({ key: privatePEM, format: 'pem' });
    }
    else {
        throw new Error('Not a valid PRIVATE PEM string');
    }
}
exports.pemToPrivateKey = pemToPrivateKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xpYi9zcmMvbWlvU2VjdXJpdHkvY3J5cHRvL2tleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7Ozs7OztBQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUMsV0FBVyxDQUFDLENBQUMscUVBQXFFO0FBQzlHLHVEQUFpQztBQUVqQyw4REFBOEQ7QUFDOUQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBR2pDLHFCQUFlO0lBQ2QsZUFBZSxpQkFBQTtJQUNmLFFBQVEsVUFBQTtJQUNSLGNBQWMsZ0JBQUE7SUFDZCxlQUFlLGlCQUFBO0NBQ2YsQ0FBQztBQWNGLElBQU0sWUFBWSxHQUFXLG1CQUFNLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDbkUsSUFBTSxhQUFhLEdBQVcsbUJBQU0sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUd4RTs7Ozs7Ozs7R0FRRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxHQUFrQixFQUFFLEdBQW1CO0lBQXZDLG9CQUFBLEVBQUEsa0JBQWtCO0lBQUUsb0JBQUEsRUFBQSxtQkFBbUI7SUFDdEUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2xDLE1BQU0sQ0FBQyxlQUFlLENBQ3JCLEdBQUcsRUFDSCxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsRUFDdEIsVUFBQyxHQUFVLEVBQUUsU0FBb0IsRUFBRSxVQUFxQjtZQUN2RCxPQUFPLEdBQUcsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLFdBQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFURCwwQ0FTQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxHQUFjO0lBQ3RDLElBQUcsR0FBRyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQUUsTUFBTSxLQUFLLENBQUMsNkVBQXNFLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDO0lBQ2xKLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN2RCxPQUFPLEdBQUcsQ0FBQyxRQUFNLENBQUEsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBYyxDQUFDO0FBQ3pELENBQUM7QUFKRCw0QkFJQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxHQUEyQjtJQUN6RCxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFGRCx3Q0FFQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxVQUFzQjtJQUNyRCxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBRTtRQUNoRCxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDbkU7U0FBTTtRQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUNsRDtBQUNGLENBQUM7QUFORCwwQ0FNQyJ9