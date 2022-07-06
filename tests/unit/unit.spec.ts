import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as thisMio from '../../src/mioScaffold';

export const mio = thisMio;
export const assert = chai.assert;
export const config = mio.depends.getNodePackage('config');

chai.use(chaiAsPromised);

describe('mioScaffold unit tests', function () {
	describe('General Houskeeping', function () {
		it('The default configuration has loaded and is in test environment', function () {
			assert.exists(config, 'config does not exist');
			assert.isObject(config, 'config is not an object');
			assert.equal(config.get('environment'), 'test', 'not in testing environment');
		});

	});
	require('./mioTools.spec');
	require('./mioSecurity.spec');
});
