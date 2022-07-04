import path from 'path';
import {findMioRootDir} from './mioTools.js'
process.env["NODE_CONFIG_DIR"] = path.join(findMioRootDir(__dirname), 'configs');
import theConfig from 'config';
import { Config } from '../types.js';

/**
 * Provides the application configuration object.
 * 
 * This object is provided by the [config](https://www.npmjs.com/package/config) package.  
 * Please consult the documentation there for general usage and concepts.
 * 
 * The default configurations are store in the `../mioApp/configs` directory.
 * 
 * @todo Point to default config files
 */
 export const config:Config = theConfig;
