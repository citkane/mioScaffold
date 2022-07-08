/**
 * #### The base Json Web Token (JWT) utilities for mio.
 * This should be limited to usage of the
 * <a href="https://github.com/panva/jose" target="_blank">jose</a>
 * suite of JWT tools and upgraded to native NODEjs when native tools are stable.
 *
 * @module
 */
import jose = require('jose');
import type { keyObject } from './keys';
declare type JWTtoken = `${string}.${string}.${string}`;
declare type uri = `${string}:${string}/${string}?${string}#${string}` | `${string}:${string}/${string}?${string}` | `${string}:${string}/${string}` | `${string}:${string}/` | `${string}:${string}`;
declare const _default: {
    generateTokenJWT: typeof generateTokenJWT;
    decodeTokenJwt: typeof decodeTokenJwt;
    validateTokenJWT: typeof validateTokenJWT;
};
export default _default;
export declare type expireTime = `${number} ${'seconds' | 'second' | 'minutes' | 'minute' | 'hours' | 'hour' | 'days' | 'day' | 'weeks' | 'week'}`;
/**
 * At minimum recommeended reserved claims as referenced from
 * <a href="https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims#reserved-claims" target="_blank">auth0.com</a>.
 */
export interface jwtClaims extends jwtCustomClaims {
    /** (issuer): The issuer of the JWT */
    iss: uri;
    /** (subject): The subject of the JWT (user) */
    sub: string;
    /** (audience): Recipients for which the JWT is intended. include at minimum the issuing server*/
    aud: (string | uri)[];
    /** (expiration time):Time after which the token expires */
    exp: expireTime;
    /** (not before time): (not before time): Time before which the JWT must not be accepted for processing */
    nbf?: number;
    /** (issued at time): Time at which the JWT was issued; can be used to determine age of the JWT */
    iat?: number;
    /** (JWT ID): Unique identifier; can be used to prevent the JWT from being replayed (allows a token to be used only once) */
    jti?: string;
}
interface jwtCustomClaims {
    [key: `mio_${string}`]: string | object | number;
}
export interface validatedClaims {
    payload: jwtClaims;
    protectedHeader: jose.JWTHeaderParameters;
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
export declare function generateTokenJWT(claims: jwtClaims, key: keyObject, alg?: string): Promise<JWTtoken>;
/**
 * Decodes an unencrypted signed JWT.
 * This does NOT validate if the payload
 * @param token
 * @returns a payload claims
 *
 * @group Parse
 */
export declare function decodeTokenJwt(token: JWTtoken): jwtClaims;
/**
 *
 * @param token
 * @param key
 * @returns
 *
 * @group Parse
 */
export declare function validateTokenJWT(token: JWTtoken, key: keyObject): Promise<validatedClaims>;
//# sourceMappingURL=jwt.d.ts.map