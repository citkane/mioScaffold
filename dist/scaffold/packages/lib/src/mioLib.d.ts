/**
 *
 * A library of pure static functions
 *
 * @module
 */
import * as security from './mioSecurity';
import * as persistence from './mioPersistence';
export { security };
export { persistence };
/**
 * Finds the root folder of the mio installation
 *
 * @param childDirName The directory the function is being called from.
 * @param rootDirName The name of the root directory to be sought. Defaults to `mioScaffold`.
 * @returns The file path of the root installation
 */
export declare function findMioRootDir(childDirName?: string, rootDirName?: string): string;
declare const _default: {
    security: typeof security;
    persistence: typeof persistence;
    findMioRootDir: typeof findMioRootDir;
};
export default _default;
//# sourceMappingURL=mioLib.d.ts.map