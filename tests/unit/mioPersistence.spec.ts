
import path from 'path';
import fs from 'fs-extra';
import mio from '@mio/scaffold';
import { assert } from './unit.spec';

const testTempDir = path.join(mio.lib.findMioRootDir(), 'tests/tmp');
const testDBfile = path.join(testTempDir, 'tests/tmp/test.db');
let db;

describe('PERSISTENCE UTILITY TESTS', async function(){
	describe('sqlite database', function(){
		before(function(){
			fs.removeSync(testTempDir);
			fs.ensureFileSync(testDBfile);
		});
		after(function(){
			fs.removeSync(testTempDir);
		});
		it('opens a sqlite3 database from file', async function(){
			db = await mio.lib.persistence.getSqliteDb(testDBfile);
			assert.hasAllDeepKeys(db, {'config':['filename', 'driver'], 'db':[]});

		});
		it('writes to and retrieves from the db', async function(){
			await db.exec('CREATE TABLE foo (name TEXT, val INT)');
			await db.exec('INSERT INTO foo VALUES ("test", 2)');
			const result = await db.get('SELECT * from foo');
			assert.deepEqual(result, { name: 'test', val: 2 });
		});
	});
});