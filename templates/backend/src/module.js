//- [Microservice Module Quickstart](../README.html)
//- [Creating your modules internal API](./interfaces/InternalApi.html)
//- [Creating a vioLang interface to your module](./interfaces/ExternalApi.html)

if(!process.env.NODE_ENV) process.env.NODE_ENV = "development";

const config = require('@vio-app/config');
const { VioConnect, Logger } = require('@vio-core/connect');

const InternalApi = require('./interfaces/InternalApi');
const ExternalApi = require('./interfaces/ExternalApi');

    //Settings relevant to this module
const appDetails = {
        //**[1]** The security domain that this microservice will be running in.
        domain: 'vioApp',
        //**[2]** Give the module a name. This will be the root of MQTT topics for CRUD.
        uid: 'mail',
        type: 'service',
        InternalApi,
        ExternalApi,
        config
}
    //

const logger = new Logger(appDetails);

let connection;
    //This defines the secure boot sequence in order to connect to the BUS, and may vary between contexts
new VioConnect(appDetails, logger).init()
    .then(conn => connection = conn)
    .then(() => connection.register())
    .then(challenge => connection.runChallenge(challenge))
    .then(result => connection.getServiceToken(result))
    .then(token => connection.connectMqtt(token))
    .catch(err => {
        logger.logError(err);    
        process.abort();
    })
    //

//**[3]** edit ``../package.json``
//```
//"name": "@vio-module/<thisModuleName>-bff"
//```