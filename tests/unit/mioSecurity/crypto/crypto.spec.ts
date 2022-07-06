import * as mio from '../../../../src/mioScaffold';
import { assert } from 'chai';
import { jwtClaims } from '../../../../build/lib/mioSecurity/crypto/jwt';

describe('Crytographic functions', function () {
	let privateKey, publicKey, keyPair, privatePem, publicPem;
	describe('Asymmetrical Key functions', function () {
		it('creates keys', async function () {
			keyPair = await mio.security.crypto.keys.generateKeyPair();
			assert.hasAllKeys(keyPair, ['privateKey', 'publicKey'], 'invalid KeyPair created');

			({ privateKey, publicKey } = keyPair);

			assert.isObject(privateKey, 'invalid private key object');
			assert.equal(privateKey.type, 'private', 'private key is not private');
			assert.isObject(publicKey, 'invalid public key object');
			assert.equal(publicKey.type, 'public', 'public key is not public');
		});

		it('converts keys to PEM', function () {
			assert.isString((() => privatePem = mio.security.crypto.keys.keyToPEM(privateKey))());
			assert.isString((() => publicPem = mio.security.crypto.keys.keyToPEM(publicKey))());
			assert.isTrue(privatePem.startsWith('-----BEGIN PRIVATE KEY-----\n'), 'invalid private PEM created');
			assert.isTrue(publicPem.startsWith('-----BEGIN PUBLIC KEY-----\n'), 'invalid public PEM created');


		});
		it('errors when converting public PEM to private key', function () {
			assert.throws(
				() => mio.security.crypto.keys.pemToPrivateKey(publicPem),
				Error,
				'Not a valid PRIVATE PEM string'
			);
		});
		it('converts PEM to keys', function () {
			assert.isTrue(mio.security.crypto.keys.pemToPublicKey(publicPem).equals(publicKey), 'invalid public key returned from pem');
			assert.isTrue(mio.security.crypto.keys.pemToPrivateKey(privatePem).equals(privateKey), 'invalid private key returned from pem');
		});
	});

	describe('JSON Web Token functions', function () {
		const claims: jwtClaims = {
			aud: ['testeserver'],
			exp: '1 minutes',
			iss: 'mio:testsecurity/unit',
			sub: 'test user',
			mio_foo: 'bar'
		};
		let asymmetricToken, decodedPayload;

		function testPayload(payload){
			assert.isObject(payload, 'invalid decoded payload');
			assert.hasAllKeys(payload, claims);
			assert.containsAllKeys(payload, ['aud', 'exp', 'iat', 'iss', 'jti', 'nbf', 'sub']);
		}

		it('creates JSON Web Tokens', async function () {
			asymmetricToken = await mio.security.crypto.jwt.generateTokenJWT(claims, privateKey);
			assert.equal(asymmetricToken.split('.').length, 3);
		});
		it('decodes a JWT payload', function(){
			decodedPayload = mio.security.crypto.jwt.decodeTokenJwt(asymmetricToken);
			testPayload(decodedPayload);

		});
		it('fails validation for a bad cert', async function(){
			const badkeys = await mio.security.crypto.keys.generateKeyPair();
			return assert.isRejected(mio.security.crypto.jwt.validateTokenJWT(asymmetricToken, badkeys.publicKey), Error, 'signature verification failed');
		});
		it('validates a signed JWT', async function(){
			const validPayload = await mio.security.crypto.jwt.validateTokenJWT(asymmetricToken, publicKey);
			testPayload(validPayload.payload);		
		});
	});

	describe('Password hashing and other utilities', function(){
		const goodPassword = 'goodpassword';
		let hash: string;
		it('creates a password hash', async function(){
			hash = await mio.security.crypto.passwords.createHashFromPassword(goodPassword);
			assert.isString(hash);
		});
		it('verifies password using the hash', async function(){
			const verified = await mio.security.crypto.passwords.validatePasswordFromHash(goodPassword, hash);
			assert.isTrue(verified, 'did not verify password with hash');
		});
		it('rejects bad password', async function(){
			const verified = await mio.security.crypto.passwords.validatePasswordFromHash('badpassword', hash);
			assert.isFalse(verified, 'did not reject a bad password with hash');
		});		
	});
});