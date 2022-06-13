//- [Frontend Quickstart](../README.html)
//- [Adding your module markup to vioApp](./components/ModuleComponent.html)
//
//**This is the class that gets initiated when a user browses to the module in vioApp.**  
//- Developers define the internal api interface for their vio-module here.
//- [vioLANG](../../../core/viocore-connect/README.html) is at ``window.vio``.

//
class Session {

    constructor(ModuleComponent, moduleName) {
        this.Module = ModuleComponent;
        this.moduleName = moduleName;
    }


    init(){
    //#### [1] Add your module initialisation code
    //Called after the module is loaded into the vioApp DOM.

        //Example
        vio.subscribe('demo/do/something/#');
        vio.on('demo/do/something/method1', (topic, data, params) => {
            this.method1(data);
        })
        //

    //
    }

    //#### [2] Developer adds api methods here
    //Any api method code relevant to *your* module goes here.
    method1(){}
    method2(){}
    etc(){}
    //

    exit(){
    //#### [3] Add your module clean-up code.
    //Called just before the module is removed from the vioApp DOM

        //Example
        vio.unsubscribe('demo/do/something/#');
        //

    //
    }
}
//
export default Session;