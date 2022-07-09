import path from 'path';
import mio from '@mio/scaffold';
import {assert} from '@mio/testconfig';

describe('TOOL UTILITY TESTS', function(){
	it('Finds the root install path', function () {
		let rootDir;
		const installedPath = path.join(__dirname, '../../');
		const installedBaseName = path.basename(installedPath);
		assert.doesNotThrow(function () {
			rootDir = mio.lib.findMioRootDir(__dirname, installedBaseName);
		});
		assert.equal(rootDir, installedPath, 'did not find the root install directory');
	});	
	it('Errors when the system root folder is reached', function(){
		assert.throws(()=>mio.lib.findMioRootDir(__dirname, '/'), Error, 'Cannot find the project root folder: \'/\'');
	});
});

require('./mioSecurity.spec');
require('./mioPersistence.spec');