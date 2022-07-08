"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.passwords = exports.keys = exports.jwt = void 0;
var jwt = __importStar(require("./jwt"));
exports.jwt = jwt;
var keys = __importStar(require("./keys"));
exports.keys = keys;
var passwords = __importStar(require("./passwords"));
exports.passwords = passwords;
exports["default"] = {
    jwt: jwt,
    keys: keys,
    passwords: passwords
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbGliL3NyYy9taW9TZWN1cml0eS9jcnlwdG8vY3J5cHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILHlDQUE2QjtBQVVyQixrQkFBRztBQVRYLDJDQUErQjtBQVV2QixvQkFBSTtBQVRaLHFEQUF5QztBQVVqQyw4QkFBUztBQVJqQixxQkFBZTtJQUNkLEdBQUcsS0FBQTtJQUNILElBQUksTUFBQTtJQUNKLFNBQVMsV0FBQTtDQUNULENBQUMifQ==