"use strict";
/**
 * #### The base Json Web Token (JWT) utilities for mio.
 * This should be limited to usage of the
 * <a href="https://github.com/panva/jose" target="_blank">jose</a>
 * suite of JWT tools and upgraded to native NODEjs when native tools are stable.
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validateTokenJWT = exports.decodeTokenJwt = exports.generateTokenJWT = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var crypto = require('crypto');
var jose = require("jose");
var config_1 = __importDefault(require("@mio/config"));
exports["default"] = {
    generateTokenJWT: generateTokenJWT,
    decodeTokenJwt: decodeTokenJwt,
    validateTokenJWT: validateTokenJWT
};
var jwtAlgorithmAsym = config_1["default"].get('security.jwt.algorithmASym');
function formatClaimObject(claim) {
    var now = Math.round(Date.now() / 1000);
    if (!claim.nbf)
        claim.nbf = now - 1;
    if (!claim.iat)
        claim.iat = now;
    if (!claim.jti)
        claim.jti = crypto.randomUUID();
    return claim;
}
/**
 * Generates a new [JSON Web Token](https://jwt.io/)
 * @param issuer the "issuer" claim value
 * @param expiration the expire time. Use the format '1 day', '2 weeks', etc
 * @param key The key or secret you wish to sighn the JWT with
 * @param asym uses asymetrical algorithm by default, set `false` for use with symetrical secrets
 * @returns a JWT formatted string
 *
 * @group Generate
 */
function generateTokenJWT(claims, key, alg) {
    if (alg === void 0) { alg = jwtAlgorithmAsym; }
    var jClaims = formatClaimObject(claims);
    return new jose.SignJWT(jClaims)
        .setProtectedHeader({
        alg: alg
    })
        .setIssuer(claims.iss)
        .setExpirationTime(claims.exp)
        .sign(key);
}
exports.generateTokenJWT = generateTokenJWT;
/**
 * Decodes an unencrypted signed JWT.
 * This does NOT validate if the payload
 * @param token
 * @returns a payload claims
 *
 * @group Parse
 */
function decodeTokenJwt(token) {
    var payload = jose.decodeJwt(token);
    return payload;
}
exports.decodeTokenJwt = decodeTokenJwt;
/**
 *
 * @param token
 * @param key
 * @returns
 *
 * @group Parse
 */
function validateTokenJWT(token, key) {
    var validation = jose.jwtVerify(token, key);
    return validation;
}
exports.validateTokenJWT = validateTokenJWT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbGliL3NyYy9taW9TZWN1cml0eS9jcnlwdG8vand0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztHQU9HOzs7Ozs7QUFFSCw4REFBOEQ7QUFDOUQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLDJCQUE4QjtBQUM5Qix1REFBaUM7QUFVakMscUJBQWU7SUFDZCxnQkFBZ0Isa0JBQUE7SUFDaEIsY0FBYyxnQkFBQTtJQUNkLGdCQUFnQixrQkFBQTtDQUNoQixDQUFDO0FBZ0NGLElBQU0sZ0JBQWdCLEdBQVcsbUJBQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUUxRSxTQUFTLGlCQUFpQixDQUFDLEtBQWdCO0lBQzFDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLElBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRztRQUFFLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFFLENBQUMsQ0FBQztJQUNsQyxJQUFHLENBQUMsS0FBSyxDQUFDLEdBQUc7UUFBRSxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUMvQixJQUFHLENBQUMsS0FBSyxDQUFDLEdBQUc7UUFBRSxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQyxPQUFPLEtBQUssQ0FBQztBQUNkLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxNQUFnQixFQUFFLEdBQWMsRUFBRSxHQUFzQjtJQUF0QixvQkFBQSxFQUFBLHNCQUFzQjtJQUN4RixJQUFNLE9BQU8sR0FBWSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUEwQixDQUFDO1NBQ2pELGtCQUFrQixDQUFDO1FBQ25CLEdBQUcsS0FBQTtLQUNILENBQUM7U0FDRCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNyQixpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQzdCLElBQUksQ0FBQyxHQUFHLENBQXNCLENBQUM7QUFDbEMsQ0FBQztBQVRELDRDQVNDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxLQUFlO0lBQzdDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFZLENBQUM7SUFDakQsT0FBTyxPQUFvQixDQUFDO0FBQzdCLENBQUM7QUFIRCx3Q0FHQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxLQUFlLEVBQUUsR0FBYztJQUMvRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQXFCLENBQUM7SUFDbEUsT0FBTyxVQUFzQyxDQUFDO0FBQy9DLENBQUM7QUFIRCw0Q0FHQyJ9