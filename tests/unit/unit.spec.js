const fs = require('fs');
const mio = require('../../build/mioScaffold');
const path = require('path');

const config = mio.depends.getNodePackage('config');
const { assert } = require('chai');
const { doesNotMatch } = require('assert');
const { Console } = require('console');

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

    describe('security utility tests', function () {
        let privateKey, publicKey, secretKey;
        it('creates and converts keys', async function(){
            ({privateKey, publicKey} = await mio.security.crypto.generateDomainKeysPEM());
            //assert.hasAllKeys(pemKeyPair,['privateKey', 'publicKey'], 'invalid KeyPair created');
            //assert.isTrue(pemKeyPair.privateKeyPEM.startsWith('-----BEGIN PRIVATE KEY-----\n'), 'invalid private PEM created');
            //assert.isTrue(pemKeyPair.publicKeyPEM.startsWith('-----BEGIN PUBLIC KEY-----\n'), 'invalid public PEM created');


            //privateKey = await mio.security.crypto.convertPEMtoPrivateKey(pemKeyPair.privateKeyPEM)
            assert.isObject(privateKey, 'invalid private key object');
            assert.equal(privateKey.type, 'private', 'private key is not private');
            
            //publicKey = await mio.security.crypto.convertPEMtoPublicKey(pemKeyPair.publicKeyPEM)
            assert.isObject(publicKey, 'invalid public key object');
            assert.equal(publicKey.type, 'public', 'public key is not public') ;
            
            secretKey = await mio.security.crypto.generateSecretKey();
            assert.isObject(secretKey, 'invalid secret key object');
            assert.equal(secretKey.type, 'secret', 'secret key is not secret');

            const keys = {
                pem:{},
                jwk:{}
            }
            
            assert.isString(await (() => keys.pem.privateKey = mio.security.crypto.keyToPEM(privateKey))());
            assert.isString(await (() => keys.pem.publicKey = mio.security.crypto.keyToPEM(publicKey))());
            assert.throws(
                () => mio.security.crypto.keyToPEM(secretKey),
                Error,
                'Only public / private keys can be converted to PEM. Received type: secret'
            );

            //assert.throws(mio.security.crypto.keyToJWKstring(privateKey), Error);
            //assert.throws(mio.security.crypto.keyToJWKstring(publicKey), Error);
            assert.isString((() => keys.jwk.secretKey = mio.security.crypto.keyToJWKstring(secretKey))());

            //assert.equal(mio.security.crypto.stringToPublicKey(keys.jwk.publicKey).type, 'public', 'no public key returned from jwk');
            assert.equal(mio.security.crypto.stringToPublicKey(keys.pem.publicKey).type, 'public', 'no public key returned from pem');
            //assert.equal(mio.security.crypto.stringToPrivateKey(keys.jwk.privateKey).type, 'private', 'no private key returned from jwk');
            assert.equal(mio.security.crypto.stringToPrivateKey(keys.pem.privateKey).type, 'private', 'no private key returned from pem');
            //assert.equal(mio.security.crypto.stringToSecretKey(keys.jwk.secretKey).type, 'secret', 'no secret key returned from jwk');
            console.log(keys.jwk.secretKey)
            console.log(mio.security.crypto.stringToSecretKey(keys.jwk.secretKey))

            //mio.security.crypto.stringToPublicKey(keys.jwk.privateKey)
        })
        /*
        it('creates and validates JSON Web Tokens', async function(){
            const {privateKeyPEM} = await mio.security.crypto.generateDomainKeysPEM();
            //const badPrivateKey = await mio.security.crypto.convertPEMtoPrivateKey(privateKeyPEM);
            function testToken(token, len) {
                assert.isString(token)
                assert.equal(token.split('.').length, len)  
            }
            const jwtSymmetricToken = await mio.security.crypto.generateTokenJWT('testrunner', '1 minute', privateKey);
            const jwtEncrptedToken = await mio.security.crypto.generateEncryptedTokenJWT('testrunner', '1 second', secretKey);

            testToken(jwtEncrptedToken, 5);
            
            //const jwtToken = await mio.security.crypto.generateTokenJWT('testrunner', '1 minute', privateKey)
            //const validJWT = await mio.security.crypto.validateTokenJWT(jwtAsymmetricToken, secretKey);
            const validJWT = await mio.security.crypto.decryptTokenJwt(jwtEncrptedToken, secretKey)
            //console.log(validJWT)
        })
        */
    })

});
