//- [Microservice Module Quickstart](../../README.html)
//- [Name your module](../module.html)
//- [Creating your modules internal API](./InternalApi.html)
const ExternalInterface = require('@vio-core/connect/src/vioLang/ExternalInterface');

module.exports =  class ExternalApi extends ExternalInterface  {
    constructor(api) {
    //### [1] Instantiate each of your api contexts
    //\<Array\>[string, string]<br />
    //Provides empty CRUD interface object for each context.
        super(['context1', 'context2']);
    //

    //TODO - set publisher permissions and documentation
    this.provides = {
        'some/topic/this/module/publishes': {
            permissions: {},
            docs: {}
        }
    }
    //

    //### [2] Declare CRUD for context1

        //**Create**
        this.interface.context1.create = {
            function1: {
                fn: (param) => api.api1.function1(param),
                permissions: {},
                docs:{}
            }
        }
        //

        //**Read**
        this.interface.context1.read = {
            function2: {
                fn: (param1, param2) => api.api1.function2(param1, param2),
                permissions: {},
                docs:{}
            }
        }
        //
    //

    //### [3] Declare CRUD for context2

        //**Update**
        this.interface.context2.update = {
            function1: {
                fn: (param) => api.api2.function1(param),
                permissions: {},
                docs:{}
            }
        }
        //

        //**Delete**
        this.interface.context2.delete = {
            function2: {
                fn: (param1, param2) => api.api2.function2(param1, param2),
                permissions: {},
                docs:{}
            }
        }
        //
    }
    //
}
//