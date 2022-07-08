"use strict";
/**
 * #### Hashing and other password related utilities
 * uses the <a href="https://github.com/kelektiv/node.bcrypt.js" target="_blank">bcrypt</a> library.
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validatePasswordFromHash = exports.createHashFromPassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = __importDefault(require("@mio/config"));
var saltRounds = config_1["default"].get('security.hash.saltRounds');
exports["default"] = {
    createHashFromPassword: createHashFromPassword,
    validatePasswordFromHash: validatePasswordFromHash
};
/**
 * Creates a hash from a password string for storage in the user database
 * @param password
 * @param rounds
 * @returns hash string
 *
 * @group Hashing Functions
 */
function createHashFromPassword(password, rounds) {
    if (rounds === void 0) { rounds = saltRounds; }
    return bcrypt_1["default"].hash(password, rounds);
}
exports.createHashFromPassword = createHashFromPassword;
/**
 * Validate a hash against a password string
 * @param password
 * @param hash
 * @returns
 *
 * @group Validation Functions
 */
function validatePasswordFromHash(password, hash) {
    return bcrypt_1["default"].compare(password, hash);
}
exports.validatePasswordFromHash = validatePasswordFromHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbGliL3NyYy9taW9TZWN1cml0eS9jcnlwdG8vcGFzc3dvcmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7Ozs7O0FBRUgsa0RBQTRCO0FBQzVCLHVEQUFpQztBQUVqQyxJQUFNLFVBQVUsR0FBVyxtQkFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBRWxFLHFCQUFlO0lBQ2Qsc0JBQXNCLHdCQUFBO0lBQ3RCLHdCQUF3QiwwQkFBQTtDQUN4QixDQUFDO0FBQ0Y7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLHNCQUFzQixDQUFDLFFBQWdCLEVBQUUsTUFBMkI7SUFBM0IsdUJBQUEsRUFBQSxtQkFBMkI7SUFDbkYsT0FBTyxtQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUZELHdEQUVDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLHdCQUF3QixDQUFDLFFBQWdCLEVBQUUsSUFBWTtJQUN0RSxPQUFPLG1CQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRkQsNERBRUMifQ==