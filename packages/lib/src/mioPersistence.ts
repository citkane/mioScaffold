import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export default {
	getSqliteDb
};

export async function getSqliteDb(filename: string): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
	return open({
		filename,
		driver: sqlite3.Database
	});
}