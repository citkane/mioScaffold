//- [Frontend Quickstart](../../README.html)
//- [Creating your modules internal API](../ModuleSession.html)
//
//**This is the root module component where component markup is added to the vioApp framework**<br />
//Markup is in the form of JSX (ie. Vue or React JSX template markup)<br />
//Normal HTML markup is also acceptable, as long as it within one parent container<br />
//(eg. \<div\> ... \</div\>)

//
//#### [1] Import your module specific css
import '../css/template.scss';
//

class ModuleTemplate extends React.Component {
    //**Component constructor**
    constructor(props){
        super(props);
        //- [vioLAng](../../../../core/viocore-connect/README.html) is at ``window.vio``.

        //- The vioApp full session Api  
        //[router](https://reacttraining.com/react-router/web/guides/quick-start) components and methods are in ``this.vioApp.router``  
        //TODO - refine and document the vioApp implementation of routing
        this.vioApp = props.vioApp;

        //- The session for this module, including the modules internal api.
        this.module = props.module;

        //- Functions to interact with the vioApp CHROME
        this.chrome = props.chrome;

        //
    }
    //

    //**Called once the module has rendered to the browser DOM**
    componentDidMount(){
        //Initialises any user defined module code in the module session
        this.module.init();
        //
        //#### [2] Add your modules JSX markup for UI zones to vioApp

            //topUserBar.setBreadcrumb
        this.chrome.topUserBar.setBreadcrumb(
            <span>moduleTemplate</span>
        )
            //contentDrawerLeft.setContent
        this.chrome.contentDrawerLeft.setContent(
            <div>contentDrawerLeft</div>
        )
            //contentDrawerRight.setContent
        this.chrome.contentDrawerRight.setContent(
            <div>contentDrawerRight</div>
        )
            //contentDrawerTop.setContent
        this.chrome.contentDrawerTop.setContent(
            <div>contentDrawerTop</div>
        )
            //contentDrawerBottom.setContent
        this.chrome.contentDrawerBottom.setContent(
            <div>contentDrawerBottom</div>
        )
        //
    }
    //

    //**Called once the module is about to be removed from the browser DOM**
    componentWillUnmount(){
        //Runs any user defined cleanup code
        this.module.exit();
        //
    }
    //

    render(){
        return (
    //#### [3] Add your modules JSX markup to vioApp appContent
            <h1>ModuleTemplate</h1>
    //
        )
    }
}

export default ModuleTemplate;

//et voila
