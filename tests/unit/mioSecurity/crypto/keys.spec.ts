import { assert, mio } from '../../unit.spec';

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
		assert.eventually;
	});
	it('errors on incorrect key algorithm', async function(){
		return assert.isRejected(mio.security.crypto.keys.generateKeyPair('foo'), Error, 'The argument \'type\' must be a supported key type. Received \'foo\'');
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