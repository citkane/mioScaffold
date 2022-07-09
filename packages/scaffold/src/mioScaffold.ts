/**
 * #### A wrapper for all things mio.
 * This is the entry point for extending mio and creating custom apps and services.  
 * The scaffold provides a namespaced object through which a developer can access all mio functionality.
 * 
 * @example
 * ```ts
 * import mio from '@mio/scaffold';
 * const alg = mio.config.get('security.keys.algorithm');
 * ```
 * 
 * @module
 */

import * as lib from '@mio/lib';
import { config } from '@mio/config';


export default { 
	lib,
	config
};