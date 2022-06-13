# Microservice Module Template #
- [Name your module](./src/module.html)
- [Creating your modules internal API](./src/interfaces/InternalApi.html)
- [Creating a vioLang interface to your module](./src/interfaces/ExternalApi.html)

## Quickstart
To create a new vioApp microservice module, ensure that you have:
- scaffolded a vioApp development environment: [How To](../../README.html)

### [1] Copy and install a new module from template
```bash
cd <your vioapp-scaffold dir>

#If module folder does not exist yet
mkdir ./modules/viomodule-<yourmodulename>
#end if

cp -r ./templates/backend ./modules/viomodule-<yourmodulename>
cd ./modules/viomodule-<yourmodulename>
#Initialise git if not yet done
cd ./backend
nvm use
npm install
```
### [2] Give your module a name
[How to name your module](./src/module.html)

### [3] Start your module
```
npm run start
```
Register your new microservice with your vioAPP credentials from the terminal prompts.

et voila
