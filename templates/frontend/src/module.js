import Session from './Session';
import ModuleComponent from './components/ModuleComponent';

const name = require('../package.json').name;
const moduleName = name.split('/')[1].trim();

export default new Session(ModuleComponent, moduleName);