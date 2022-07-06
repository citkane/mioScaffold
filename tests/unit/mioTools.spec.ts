import path from 'path';
import {assert, mio} from './unit.spec';

describe('tool utility tests', function(){
	it('Finds the root install path', function () {
		let rootDir;
		const installedPath = path.join(__dirname, '../../');
		const installedBaseName = path.basename(installedPath);
		assert.doesNotThrow(function () {
			rootDir = mio.tools.findMioRootDir(__dirname, installedBaseName);
		});
		assert.equal(rootDir, installedPath, 'did not find the root install directory');
	});	
	it('Errors when the system root folder is reached', function(){
		assert.throws(()=>mio.tools.findMioRootDir(__dirname, '/'), Error, 'Cannot find the project root folder: \'/\'');
	});
});