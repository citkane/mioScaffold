import path from 'path';

/**
 * Finds the root folder of the mio installation
 * 
 * @param childDirName The directory the function is being called from. Pass in the NODE `__dirname` global. 
 * @param rootDirName The name of the root directory to be sought. Defaults to `mioScaffold`.
 * @returns The file path of the root installation
 */
export function findMioRootDir(childDirName: string, rootDirName = 'mioScaffold'): string {
    if(childDirName === '/') throw Error('Cannot save to root. Ensure the directory "mioScaffold" exists');
    return childDirName.endsWith(`/${rootDirName}/`) ? childDirName : findMioRootDir(path.join(childDirName, '../'))
}
