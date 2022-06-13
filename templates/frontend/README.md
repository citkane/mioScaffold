# Frontend Module Template #
- [Creating your modules internal API](./src/Session.html)
- [Adding your module markup to vioApp](./src/components/ModuleComponent.html)

## Quickstart
To create a new vioApp frontend module, ensure that you have:
- scaffolded a vioApp development environment: [How To](../../README.html)
- that you have a functioning vioApp frontend dev server.

### [1] Copy and install a new module from template
```bash
cd <your vioapp-scaffold dir>

#If module folder does not exist yet
mkdir ./modules/viomodule-<yourmodulename>
#end if 

cp -r ./templates/frontend ./modules/viomodule-<yourmodulename>
cd ./modules/viomodule-<yourmodulename>
#Initialise git if not yet done
cd ./frontend
nvm use
npm install

```
### [2] Give your module a name
edit package.json ``"name": "@vio-module/<yourmodulename>"``,

### [3] Register your modules navigation
edit config.json:
```json
{
    "navigation": {
        "<Your module root navigation title>": {
            "link": "root",
            "children": {...TODO...}
        }
    }
}
```

### [4] Install your module into vioApp
```bash
cd ../../../vioapp
nvm use
npm install ../modules/viomodule-<yourmodulename>/frontend
```
### [5] Start the dev server
Stop any previously running dev servers, then:
```bash
npm run start
```

et voila
