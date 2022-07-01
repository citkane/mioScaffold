const MioLangBase = require('./etc/MioLangBase');

let client, logger;
module.exports = class MioLang extends MioLangBase {
    constructor(session, _logger, serviceName) {
        super(session, _logger, serviceName);

        logger = _logger;
        this.onFunctions = {};
        this.correlationCommands = {};
        this.mio = {};

        this.mio.on = (pattern, fnc) => {
            if(!this.onFunctions[pattern]) this.onFunctions[pattern] = [];
            this.onFunctions[pattern].push(fnc);
        }

        this.mio.off = pattern => {
            delete this.onFunctions[pattern];
        }

        this.mio.subscribe = pattern => {
            client.subscribe(pattern, err => {
                if(err) console.log(err);
            })
        }

        this.mio.unsubscribe = pattern => {
            client.unsubscribe(pattern, err => {
                if(err) console.log(err);
            })
        }

        this.mio.publish = (pattern, message) => {
            message = this.stringMessage(message);
            client.publish(pattern, message, err => {
                if(err) console.log(err);
            })
        }

        this.mio.create = this.makeCrud('create').bind(this);
        this.mio.read = this.makeCrud('read').bind(this);
        this.mio.update = this.makeCrud('update').bind(this);
        this.mio.delete = this.makeCrud('delete').bind(this);

        this.mio.init = (_client) => {
            client = _client;
            this.initInterface(client);
            client.on('message', (topic, message, packet) => {
                message = this.parseMessage(message);
                if(packet.properties && packet.properties.correlationData) {
                    if(packet.properties.responseTopic){
                        const {correlationData, responseTopic} = packet.properties;
                        return this.callApi(topic, message)
                            .then(data => this.stringMessage(data))
                            .then(data => client.publish(responseTopic, data, { properties: {
                                correlationData
                            }}))
                            .catch(err => {
                                logger.logError(err);
                            })
                    }
                    const correlation = packet.properties.correlationData.toString();
                    if(!this.correlationCommands[correlation]) return console.error(`no response command found`);
                    this.correlationCommands[correlation](message);
                    delete(this.correlationCommands[correlation]);
                    return client.unsubscribe(topic);
                }
                this.executeListeners(topic, message);
            })
        }
    }
    callApi(topic, params) {
        return this.getFunction(topic).then(fnc => fnc(...params));
    }
};