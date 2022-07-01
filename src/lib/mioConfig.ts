import path from 'path';
import { findMioRootDir } from './mioTools';
import { getNodePackage } from './mioDependencies'

process.env["NODE_CONFIG_DIR"] = path.join(findMioRootDir(__dirname), 'configs');
export const config = getNodePackage('config')