//- [Microservice Module Quickstart](../../README.html)
//- [Name your module](../module.html)
//- [Creating a vioLang interface to your module](./ExternalApi.html)
//- [Create API1](../internalApi/Api1.html)
//- [Create API2](../internalApi/Api2.html)

//

//### [1] Import your internal api's
//You can have multiple internal api contexts.
const Api1 = require('../internalApi/Api1');
const Api2 = require('../internalApi/Api2');
//

let keys, logger;
class InternalApi {
    constructor(_logger, config){
        logger = _logger;
//### [2] Initiate all your internal api contexts
        this.api = {
            context1: new Api1(config),
            context2: new Api2(config)
        }
//
        keys = Object.keys(this.api);
    }


    init(vio){
// vioLang and all internal api contexts are provided to each internal api context
        const promises = [];
        keys.forEach(key => {
            promises.push(this.api[key].init(this.api, vio, logger));
        });
        return Promise.all(promises).then(() => logger.logInternalApiReady())
//
    }
}

module.exports = InternalApi;