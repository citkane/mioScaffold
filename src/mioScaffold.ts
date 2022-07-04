/**
 * This right here motherfucker!
 * 
 * @packageDocumentation
 */

process.env['OPENSSL_CONF']='/dev/null'; /* Workaround for https://github.com/nodejs/node/discussions/43184 */

import * as tools from './lib/mioTools.js';
import {config} from './lib/mioConfig.js';
import * as depends from './lib/mioDependencies.js';
import * as security from './lib/mioSecurity.js';
import { KeyObject } from 'crypto';


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

/**
 * Provides security utility functions for consumption with the mio framework.
 */
export {security};

