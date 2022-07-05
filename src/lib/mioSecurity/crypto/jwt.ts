import jose = require('jose');
import config = require('config');
const crypto = require('crypto');
import { KeyObject } from 'crypto';

type JWTtoken = `${string}.${string}.${string}`;
export type uri = `${string}:${string}/${string}?${string}#${string}` |
`${string}:${string}/${string}?${string}` |
`${string}:${string}/${string}` |
`${string}:${string}/` |
`${string}:${string}`
export type expireTime = `${number} ${'seconds' | 'minutes' | 'hours' | 'days' | 'weeks'}`;
/**
 * At minimum reserverved claims as referenced from [auth0.com](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims#reserved-claims).
 */
export interface jwtClaims extends jwtCustomClaims{
	/** (issuer): The issuer of the JWT */
	iss:uri,
	/** (subject): The subject of the JWT (user) */
	sub:string,
	/** (audience): Recipients for which the JWT is intended. include at minimum the issuing server*/
	aud:(string | uri)[],
	/** (expiration time):Time after which the token expires */
	exp:expireTime,
	/** (not before time): (not before time): Time before which the JWT must not be accepted for processing */
	nbf?:number,
	/** (issued at time): Time at which the JWT was issued; can be used to determine age of the JWT */
	iat?:number,
	/** (JWT ID): Unique identifier; can be used to prevent the JWT from being replayed (allows a token to be used only once) */
	jti?:string,
	/** Any amount of addition custom claims */
}
interface jwtCustomClaims {
	[key:`mio_${string}`]: any
}

const jwtAlgorithmAsym: string = config.get('security.jwt.algorithmASym');

function formatClaimObject(claim: jwtClaims): jwtClaims {
	const now = Math.round(Date.now()/1000);
	if(!claim.nbf) claim.nbf = now -1;
	if(!claim.iat) claim.iat = now;
	if(!claim.jti) claim.jti = crypto.randomUUID();
	return claim;
}

/**
 * Generates a new [JSON Web Token](https://jwt.io/)
 * @param issuer the "issuer" claim value
 * @param expiration the expire time. Use the format '1 day', '2 weeks', etc
 * @param key The key or secret you wish to sighn the JWT with
 * @param asym uses asymetrical algorithm by default, set `false` for use with symetrical secrets
 * @returns 
 */
export function generateTokenJWT(claims:jwtClaims, key: KeyObject, alg = jwtAlgorithmAsym): Promise<JWTtoken> {
	return new Promise(async (resolve, reject) => {
		const jClaims: unknown = formatClaimObject(claims);	
		const jwt = await new jose.SignJWT(jClaims as jose.JWTPayload)
			.setProtectedHeader({
				alg
			})
			.setIssuer(claims.iss)
			.setExpirationTime(claims.exp)
			.sign(key)
			.catch(err => reject(err))
		
		resolve(jwt as JWTtoken)
	})
}

export function decodeTokenJwt(token: JWTtoken): jwtClaims {
	const payload = jose.decodeJwt(token) as unknown;
	return payload as jwtClaims;
}


export function validateTokenJWT(token: JWTtoken, key: KeyObject): Promise<any> {
	return jose.jwtVerify(token, key);
	//const foo = jose.decodeJwt(token);
	//return new Promise((resolve) => resolve(foo));
}