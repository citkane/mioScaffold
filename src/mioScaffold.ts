/**
 * <style>
 *	#logo {
 *		width: 100%;
 *		display: flex;
 *		align-items: center;
 *		justify-content: left;
 *		margin: 40px 0;
 *	}
 *	#logo img {
 *		width: 120px;
 *		height: auto;
 *		display: inline-block;
 *		margin-right: 40px;
 *	}
 *	#logo h3 {
 *		margin-bottom: 40px;
 *	}
 * </style>
 * 
 * <div id = logo>
 *	<img src="../assets/logo.svg" alt="mio logo" />
 *	<h3>Yet Another Microservice Framework</h3>
 * </div>
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

