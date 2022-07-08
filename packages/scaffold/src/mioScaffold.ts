import lib from '@mio/lib';
import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(lib.findMioRootDir(), 'configs');
//import config from '@mio/config';

export {lib};
//export {config};

export default {
	lib,
	//config
};