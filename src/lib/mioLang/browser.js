const patternmatch = require('mqtt-pattern');
const uid = require('uid').default;

let client, logger;
export default class VioLangBrowser {
    constructor(_client, _logger) {
        client = _client;
        logger = _logger;
        this.onFunctions = {};
        this.correlationCommands = {};
        this.mio = {};
        client.on('message', (topic, message, packet) => {
            message = this.parseMessage(message);
            if(packet.properties && packet.properties.correlationData) {
                if(packet.properties.responseTopic){
                    const {correlationData, responseTopic} = packet.properties;
                    return client.publish(responseTopic, JSON.stringify({test: 'payload'}),{ properties: {
                        correlationData
                    }})
                }
                const correlation = packet.properties.correlationData.toString();
                if(!this.correlationCommands[correlation]) return logger.logError(`no response command found`);
                this.correlationCommands[correlation](message);
                delete(this.correlationCommands[correlation]);
                return client.unsubscribe(topic);
            }
            this.executeListeners(topic, message);
        })

        this.mio.on = (pattern, fnc) => {
            if(!this.onFunctions[pattern]) this.onFunctions[pattern] = [];
            this.onFunctions[pattern].push(fnc);
        }

        this.mio.off = pattern => {
            delete this.onFunctions[pattern];
        }

        this.mio.subscribe = pattern => {
            client.subscribe(pattern, err => {
                if(err) logger.logError(err);
            })
        }

        this.mio.unsubscribe = pattern => {
            client.unsubscribe(pattern, err => {
                if(err) logger.logError(err);
            })
        }

        this.mio.publish = (pattern, message) => {
            if(typeof message !== 'string') try {
                message = JSON.stringify(message)
            }
            catch(err){
                message = message.toString();
            }
            client.publish(pattern, message, err => {
                if(err) logger.logError(err);
            })
        }

        this.mio.create = this.makeCrud('create').bind(this);
        this.mio.read = this.makeCrud('read').bind(this);
        this.mio.update = this.makeCrud('update').bind(this);
        this.mio.delete = this.makeCrud('delete').bind(this);
    }

    executeListeners(topic, data){
        const matches = Object.keys(this.onFunctions).filter(pattern => {
            return patternmatch.matches(pattern, topic)
        });
        
        matches.forEach(pattern => {
            this.onFunctions[pattern].forEach(fnc => {
                try{
                    fnc(topic, data, patternmatch.extract(pattern, topic))
                }
                catch(err) {
                    logger.logError(err);
                }
            })
        })
    }

    makeCrud(key){
        return function(command, params = []) {
            command = command.split('.');
            command.splice(2, 0, key);
            command = command.join('/');
            let message;
            return new Promise((resolve, reject) => {
                try {
                    message = JSON.stringify(params);
                }
                catch(err){
                    reject(err);
                }
                const responseTopic = `${command}/response`;
                const correlationData = uid();
                this.correlationCommands[correlationData] = payload => {
                    resolve(payload);
                }
                client.subscribe(responseTopic);
                client.publish(command, message, { properties: {
                    responseTopic,
                    correlationData
                }})
            })
            .catch(err => {
                logger.logError(err);
            })
        };
    }
    parseMessage(message){
        if(!message) return '';
        let data = message.toString();
        try {
            data = JSON.parse(data);
        }
        catch(err){};
        return data;
    }
};