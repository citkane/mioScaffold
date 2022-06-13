//- [Microservice Module Quickstart](../../README.html)
//- [Creating your modules internal API](../interfaces/InternalApi.html)
//- [Creating a vioLang interface to your module](../interfaces/ExternalApi.html)

let api, vio, logger, config
module.exports = class Api2 {
    constructor(_config){
        config = _config;
    }

    init(_api, _vio, _logger){
    // All internal api contexts and vioLang are provided to this api instance.
        logger = _logger;
        api = _api;
        vio = _vio;
        return Promise.resolve();
    //
    }

    //### [1] MQTT is connected - construct your api.
    onConnect(){
        //There are a few possible use case scenarios:
        //- This is a proxy interface to one or many **load balanced** viotas backend service apis
        //- This is a interface for **business logic** domain groupings, providing a hybrid of:
        //  - Internal cpu function processes
        //  - Proxy to load balanced viotas backend service apis
        //  - Proxy to other vioApp microservices via vioLang
        //  - Connection to AWS services such as Lamda, email, etc
        //- This provides internal cpu function processes

        //
    }
    //

    //### [2] Declare your api methods.

        //**function1**
    function1(param1){
            //..do something<br />
            // return something OR<br />
            // return new Promise((resolve, reject) => {...})

            //
        }
        //

        //**function2**
    function2(param1, param2){
            //..do something<br />
            // return something OR<br />
            // return new Promise((resolve, reject) => {...})

            //
        }
        //

        //**etc....**

        //

    //
};
//




