const mio = require('../../../../build/mioScaffold');
const config = mio.depends.getNodePackage('config');
const crypto = require('crypto');
const { assert } = require('chai');

describe('Crytographic functions', function () {
	let privateKey, publicKey, keyPair;
	describe('Asymmetrical Key functions', function () {
		const keys = { pem: {} }
		it('creates keys', async function () {
			keyPair = await mio.security.crypto.keys.generateKeyPair();
			assert.hasAllKeys(keyPair, ['privateKey', 'publicKey'], 'invalid KeyPair created');

			({ privateKey, publicKey } = keyPair)

			assert.isObject(privateKey, 'invalid private key object');
			assert.equal(privateKey.type, 'private', 'private key is not private');
			assert.isObject(publicKey, 'invalid public key object');
			assert.equal(publicKey.type, 'public', 'public key is not public');
		})

		it('converts keys to PEM', function () {
			assert.isString((() => keys.pem.privateKey = mio.security.crypto.keys.keyToPEM(privateKey))());
			assert.isString((() => keys.pem.publicKey = mio.security.crypto.keys.keyToPEM(publicKey))());
			assert.isTrue(keys.pem.privateKey.startsWith('-----BEGIN PRIVATE KEY-----\n'), 'invalid private PEM created');
			assert.isTrue(keys.pem.publicKey.startsWith('-----BEGIN PUBLIC KEY-----\n'), 'invalid public PEM created');


		})
		it('errors when converting public PEM to private key', function () {
			assert.throws(
				() => mio.security.crypto.keys.pemToPrivateKey(keys.pem.publicKey),
				Error,
				'Not a valid PRIVATE PEM string'
			);
		})
		it('converts PEM to keys', function () {
			assert.isTrue(mio.security.crypto.keys.pemToPublicKey(keys.pem.publicKey).equals(publicKey), 'invalid public key returned from pem');
			assert.isTrue(mio.security.crypto.keys.pemToPrivateKey(keys.pem.privateKey).equals(privateKey), 'invalid private key returned from pem');
		})
	})

	describe('JSON Web Token functions', function () {
		const claims = {
			aud: ['testeserver'],
			exp: '1 minute',
			iss: 'mio:testsecurity/unit',
			sub: 'test user',
			mio_foo: 'bar'
		}
		let asymmetricToken, decodedPayload

		function testPayload(payload){
			assert.isObject(payload, 'invalid decoded payload')
			assert.hasAllKeys(payload, claims)
			assert.containsAllKeys(payload, ['aud', 'exp', 'iat', 'iss', 'jti', 'nbf', 'sub'])
		}

		it('creates JSON Web Tokens', async function () {
			asymmetricToken = await mio.security.crypto.jwt.generateTokenJWT(claims, privateKey)
			assert.equal(asymmetricToken.split('.').length, 3);
		})
		it('decodes a JWT payload', function(){
			decodedPayload = mio.security.crypto.jwt.decodeTokenJwt(asymmetricToken);
			testPayload(decodedPayload)

		})
		it('fails validation for a bad cert', async function(){
			const badkeys = await mio.security.crypto.keys.generateKeyPair();
			return assert.isRejected(mio.security.crypto.jwt.validateTokenJWT(asymmetricToken, badkeys.publicKey), Error, 'signature verification failed')
		})
		it('validates a signed JWT', async function(){
			const validPayload = await mio.security.crypto.jwt.validateTokenJWT(asymmetricToken, publicKey);
			testPayload(validPayload.payload)		
		})
	})
})