import mio from '@mio/scaffold';
import { assert } from '@mio/testconfig';

describe('CONFIGURATION', function () {		
	it('The default configuration has loaded and is in test environment', function () {
		assert.exists(mio.config, 'config does not exist');
		assert.isObject(mio.config, 'config is not an object');
		assert.equal(mio.config.get('environment'), 'test', 'not in testing environment');
	});
});