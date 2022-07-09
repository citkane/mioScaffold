import mio from '@mio/scaffold';
import { assert } from '../../unit.spec';
import { jwtClaims } from '@mio/lib/src/mioSecurity/crypto/jwt';

import rewire from 'rewire';
const jwt = rewire('@mio/lib/src/mioSecurity/crypto/jwt');
const formatClaimObject = jwt.__get__('formatClaimObject');

const algorithm = mio.config.get('security.keys.algorithm') as string;
const modulusLength = mio.config.get('security.keys.modulusLength') as number;
const algorithmASym = mio.config.get('security.jwt.algorithmASym') as string;

function makeClaims(): jwtClaims {
	return {
		aud: ['testeserver'],
		exp: '1 minutes',
		iss: 'mio:testsecurity/unit',
		sub: 'test user',
		mio_foo: 'bar'
	};
}
describe('JSON Web Token functions', function () {
	let publicKey, privateKey;
	let claims = makeClaims();
	let asymmetricToken, decodedPayload;

	function testPayload(payload){
		assert.isObject(payload, 'invalid decoded payload');
		assert.hasAllKeys(payload, claims);
		assert.containsAllKeys(payload, ['aud', 'exp', 'iat', 'iss', 'jti', 'nbf', 'sub']);
	}

	it('creates JSON Web Tokens', async function () {
		({publicKey, privateKey} = await mio.lib.security.crypto.keys.generateKeyPair(algorithm, modulusLength));
		asymmetricToken = await mio.lib.security.crypto.jwt.generateTokenJWT(claims, privateKey,algorithmASym);
		assert.equal(asymmetricToken.split('.').length, 3);
	});
	it('decodes a JWT payload', function(){
		decodedPayload = mio.lib.security.crypto.jwt.decodeTokenJwt(asymmetricToken);
		testPayload(decodedPayload);

	});
	it('fails validation for a bad cert', async function(){
		const badkeys = await mio.lib.security.crypto.keys.generateKeyPair(algorithm, modulusLength);
		return assert.isRejected(mio.lib.security.crypto.jwt.validateTokenJWT(asymmetricToken, badkeys.publicKey), Error, 'signature verification failed');
	});
	it('validates a signed JWT', async function(){
		const validPayload = await mio.lib.security.crypto.jwt.validateTokenJWT(asymmetricToken, publicKey);
		testPayload(validPayload.payload);		
	});
	it('formats a jwtClaims object correctly', function(){
		claims = makeClaims();
		// Runs twice to let coverage past conditionals
		assert.containsAllKeys(formatClaimObject(claims), ['aud', 'exp', 'iat', 'iss', 'jti', 'nbf', 'sub']);
		assert.containsAllKeys(formatClaimObject(claims), ['aud', 'exp', 'iat', 'iss', 'jti', 'nbf', 'sub']);
	});

});