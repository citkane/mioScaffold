import path from 'path';

/**
 * Finds the root folder of the mio installation
 * 
 * @param childDirName The directory the function is being called from. 
 * @param rootDirName The name of the root directory to be sought. Defaults to `mioScaffold`.
 * @returns The file path of the root installation
 */
export function findMioRootDir(childDirName = __dirname, rootDirName = 'mioScaffold'): string {
	if (childDirName === '/') throw Error(`Cannot find the project root folder: '${rootDirName}'`);
	return childDirName.endsWith(`/${rootDirName}/`) ? childDirName : findMioRootDir(path.join(childDirName, '../'), rootDirName);
}

