"use strict";
/**
 * #### Security for mio, while at v0, should be considered as Proof of Concept.
 * The security construct provideds a flow of tokens through microservices to enforce identity and permissions.
 *
 * This should not require microservices to expose their locations to anything outside of the system, such as 3rd party auth services.
 *
 * Some FOSS libraries may be suitable as a dependency deployment within mio, for example:
 *
 * - <a href="https://supertokens.com/" target="_blank">SuperTokens</a>
 *
 * For now, we set security paranoia to 0.01, and proceed with building a simple security framework that can grow into best of class.
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.crypto = void 0;
var crypto_1 = __importDefault(require("./mioSecurity/crypto/crypto"));
exports.crypto = crypto_1["default"];
exports["default"] = crypto_1["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlvU2VjdXJpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9saWIvc3JjL21pb1NlY3VyaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7OztHQWFHOzs7Ozs7QUFFSCx1RUFBaUQ7QUFFekMsaUJBRkQsbUJBQU0sQ0FFQztBQUNkLHFCQUFlLG1CQUFNLENBQUMifQ==