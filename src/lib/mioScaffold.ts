import * as tools from './mioTools';
import * as depends from './mioDependencies';



/**
 * Provides the application configuration object as defined by the package [config](https://www.npmjs.com/package/config)
 */
export const config = depends.getNodePackage('config')
/**
 * Provides general static utility functions for consumption with the mio framework.
 */
export {tools}

/**
 * Provides 3rd party package dependencies for consumption within the mio framework.
 * 
 */
export {depends}




