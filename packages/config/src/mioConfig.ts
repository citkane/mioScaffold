/**
 *
 * @module
 */

import path from 'path';
import {findMioRootDir} from '@mio/lib';

process.env['NODE_CONFIG_DIR'] = path.join(findMioRootDir(__dirname), 'configs');

import theConfig from 'config';

/**
 * #### Provides the application configuration object.
 * 
 * This object is provided by the [config](https://www.npmjs.com/package/config) package.  
 * Please consult that documentation for general usage and concepts.
 * 
 * The default configurations are store in the `../mioApp/configs` directory.
 * 
 * @todo Point to default config files
 */
export const config = theConfig;
