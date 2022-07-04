import path from 'path';
import {findMioRootDir} from './mioTools.js';
process.env["NODE_CONFIG_DIR"] = path.join(findMioRootDir(__dirname), 'configs');
interface mioDependencies {[key: string]: any}

/**
 * A list of NODE.js package dependencies which are imported into mioScaffold and exported for use in other modules:
 */
const nodePackageDependencies: [...(string | [string, string])[]] = [
    'mqtt',
    'config',
    'mqtt-pattern',
    'uid',
    ['colors', 'colors/safe'],
    'bcrypt',
    'checksum',
    'fs-extra',
    'jose',
    'node-rsa',
    'uglify-es',
    'axios',
    'folder-hash',
    'prompt',
    'body-parser',
    'cors',
    'express',
    'express-basic-auth',
    'crypto'
]
const dependencies: mioDependencies = {}
nodePackageDependencies.forEach(nodePackage => {
    let packageName, packageRequire
    if(typeof(nodePackage) === 'object') {
        packageName = nodePackage[0]
        packageRequire = nodePackage[1]
    } else {
        packageName = packageRequire = nodePackage
    }
    dependencies[packageName] = require(packageRequire);
})


/**
 * Returns a NODEjs third party package dependency
 * 
 * This allows for core dependencies to be centrally managed, thus avoiding:
 * - multiple versions in multiple locations
 * - a spread of deprecations and security issues in multiple locations
 * 
 * @param packageName The name of the npm package as it would be used with npm install
 * @returns The imported package
 */
export function getNodePackage(packageName: string): any {
    return dependencies[packageName]
}
