/// <reference types="./vendor-typings/sqlite3" />
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
declare const _default: {
    getSqliteDb: typeof getSqliteDb;
};
export default _default;
export declare function getSqliteDb(filename: string): Promise<Database<sqlite3.Database, sqlite3.Statement>>;
//# sourceMappingURL=mioPersistence.d.ts.map