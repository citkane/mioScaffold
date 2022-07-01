const {uid, 'pattern-match' : patternmatch } = require('@mio/mioscaffold')

let logger, client;
class MioLangBase {
    constructor(session, _logger, serviceName) {
        logger = _logger;
        this.serviceName = serviceName;
        this.externalApi = session.externalApi;
        this.session = session;
    }
    initInterface(_client) {
        client=_client;
        Object.keys(this.externalApi).forEach(context => {
            Object.keys(this.externalApi[context]).forEach(crud => {
                Object.keys(this.externalApi[context][crud]).forEach(command => {
                    const topic = `${this.serviceName}/${context}/${crud}/${command}`;
                    client.subscribe(topic, {
                        //qos:,
                        //nl:,
                        //rap:,
                        //rh:,
                        //properties: {
                            //subscriptionIdentifier:,
                            //userProperties: {test: 'test'}
                        //}
                    }, err => {
                        if(err) logger.logError(err);
                    })
                })
            })
        })
        Object.keys(this.session.internalApi.api).forEach(api => {
            this.session.internalApi.api[api].onConnect();
        });
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
    stringMessage(message){
        if(typeof message !== 'string') try {
            message = JSON.stringify(message)
        }
        catch(err){
            message = message.toString();
        }
        return message;        
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

    isBadCommand(command){
        if(!command.startsWith(this.serviceName)) return true;
        command = command.split('/');
        return (
            command.length !== 4 ||
            !this.externalApi[command[1]] ||
            !this.externalApi[command[1]][command[2]] ||
            !this.externalApi[command[1]][command[2]][command[3]] ||
            !this.externalApi[command[1]][command[2]][command[3]].fn ||
            typeof this.externalApi[command[1]][command[2]][command[3]].fn !== 'function'
        )
    }

    getFunction(command){
        if(this.isBadCommand(command)) return Promise.reject('bad command');
        command = command.split('/');
        return Promise.resolve(this.externalApi[
            command[1]
        ][
            command[2]
        ][
            command[3]
        ].fn)
    }
}

module.exports = MioLangBase;