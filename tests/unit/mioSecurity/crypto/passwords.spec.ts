import { assert, mio } from '../../unit.spec';

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