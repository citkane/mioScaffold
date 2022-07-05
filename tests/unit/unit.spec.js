const fs = require('fs');
const mio = require('../../build/mioScaffold');
const path = require('path');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised)

const assert = chai.assert;

const config = mio.depends.getNodePackage('config');


/*
const testSecurityStoreLocation = path.join(__dirname,'./securityStore')
function removeTempFolders(){
    if (fs.existsSync(testSecurityStoreLocation)) fs.removeSync(testSecurityStoreLocation);
}
*/
describe('mioScaffold unit tests', function () {
    /*
    before(function(){        
        removeTempFolders();
    })
    after(function(){
        removeTempFolders();      
    })
    */
    describe('General Houskeeping', function(){
        it('The default configuration has loaded and is in test environment', function() {
            assert.exists(config, 'config does not exist')
            assert.isObject(config, 'config is not an object')
            assert.equal(config.get('environment'), 'test', 'not in testing environment')
        })
        it('Finds the root install path', function() {
            let rootDir;
            const installedPath = path.join(__dirname, '../../');
            const installedBaseName = path.basename(installedPath)
            assert.doesNotThrow(function(){
                rootDir = mio.tools.findMioRootDir(__dirname, installedBaseName);
            })
            assert.equal(rootDir, installedPath, 'did not find the root install directory')
        })
    })
    require('./mioSecurity/security.spec')

});
