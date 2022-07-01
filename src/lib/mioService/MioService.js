const MioLang = require('@mio-lib/miolang');
const MioSecurity = require('@mio-lib/miosecurity');
const mioBus = require('@mio-lib/miobus');
const Session = require('./etc/Session');
const {
    promptSchemas,
    prompt,
    setPrompt
} = require('./etc/promptSchemas');
const { colors } = require('@mio/mioscaffold');

let appDetails, logger, config;
module.exports = class MioService extends MioSecurity {
    constructor(_appDetails, _logger){
        super(_appDetails, _logger);
        
        appDetails = _appDetails;
        logger = _logger;
        config = appDetails.config;
        this.thisModuleName = appDetails.thisModuleName;
        this.thisLocation = appDetails.thisLocation;
        this.thisServiceType = appDetails.thisServiceType
        setPrompt(appDetails.uid);
    }
    init(keyManager = false){
        return this.makeSession(keyManager)
            .then(session => {
                this.internalApi = session.internalApi.api;
                this.externalApi = session.externalApi;
                if(keyManager) {
                    keyManager.mio = this;
                }
                return this;
            })
    }
    prompt(_schema, message, resolve, reject) {
        function doPrompt(self){
            const schema = promptSchemas[_schema];
            if(!schema) return reject(Error(`PromptSchema "${_schema}" was not found`));
            if(schema.color && colors[schema.color]) {
                if(message) message = colors[schema.color](message);
                schema.message = colors[schema.color](schema.message);
            }

            logger.prompt(message || schema.message, schema.title, schema.color);
            prompt.start();
            prompt.get(schema, (err, result) => {
                if(err) return reject(err);
                if(schema.validate) {
                    const v = schema.validate(result);
                    if(v.invalid) return self.prompt(_schema, v.invalid, resolve, reject);
                }
                resolve(result);
            })
        }
        if(resolve && reject){
            doPrompt(this);
        } else {
            return new Promise((_resolve, _reject) => {
                resolve = _resolve;
                reject = _reject;
                doPrompt(this);
            })
        }
    }
    makeSession(keyManager){
        return new Session(this, appDetails, logger).init(keyManager)
            .then(session => {
                logger.logMadesession();
                return session;
            });
    }

    makeMioLang(session) {
        this.mio = new MioLang(session, logger, appDetails.uid).mio;
        return this.mio;
    }
    connectBus(data){
        const { user, token } = data;
        logger.log('Connecting MQTT client to broker.')
        switch(appDetails.type) {
            case 'service':
                return this.connectMqttService(user, token);
            case 'device-iotas':
                return Promise.reject('not implemented');
            case 'device-sonoff':
                return Promise.reject('not implemented');
            default:
                return Promise.reject('not implemented');
        }
    }
    connectBusService(user, token){
        return this.makeClient(
            config.get('mqttBroker.tcp'),
            user.credentials.username,
            appDetails.uid,
            token
        );
    }
    
    makeClient(location, username, clientId, token) {
        return new Promise((resolve, reject) => {
            const client = mqtt.connect(location, {
                username,
                clientId,
                password: token,
                protocolVersion: 5
            });
            client.on('connect', () => {
                logger.log('mqtt connected');
                resolve(client);
            })
            client.on('error', err => {
                logger.log(err.message);
            })
            this.mio.init(client);
        })               
    }

    publishPermissions() {
        return new Promise((resolve, reject) => {
            this.mio.create('miocore-auth.permissions.addPermissions', [this.externalApi]).then(() => {
                console.log('hello');
                resolve();
            })           
        })
    }
}