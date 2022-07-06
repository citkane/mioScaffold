/**
 * This right here motherfucker!
 * 
 * @module
 */

process.env['OPENSSL_CONF']='/dev/null'; /* Workaround for https://github.com/nodejs/node/discussions/43184 */

import * as tools from './lib/mioTools';
import {config} from './lib/mioConfig';
import * as depends from './lib/mioDependencies';
import * as security from './lib/mioSecurity';


export {config};

/**
 * Provides general static utility functions for consumption with the mio framework.
 */
export {tools};

/**
 * Provides 3rd party package dependencies for consumption within the mio framework.
 * 
 */
export {depends};
export {security};

