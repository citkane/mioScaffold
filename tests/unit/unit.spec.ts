import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
//import mio from '@mio/scaffold';

chai.use(chaiAsPromised);

export const assert = chai.assert;

describe('mioScaffold Unit Tests', function () {
	console.log('here');
	describe('GENERAL HOUSEKEEPING', function () {
		
		it('The default configuration has loaded and is in test environment', function () {
			//assert.exists(mio.config, 'config does not exist');
			//assert.isObject(mio.config, 'config is not an object');
			//assert.equal(mio.config.get('environment'), 'test', 'not in testing environment');
		});

	});
	//require('./mioTools.spec');
	//require('./mioSecurity.spec');
});
