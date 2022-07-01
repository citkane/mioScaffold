const { colors } = require("@mio/mioscaffold");
function trace(){
    const t = Error().stack.split('\n');
    t.shift();
    t.shift();
    t.shift();
    return t.join('\n')
}

module.exports = class MioLogger {
    constructor(appDetails){        
        const { uid } = appDetails;
        this.uid = uid;
    }
    prefix(){
        return `[${this.uid}]`;
    }

    prompt(message, title, color){
        if(title) title = colors.white.bold(title);
        if(color && colors[color]) message = colors[color](message);
        console.log(`
***************************************** ${title}
${message}
*****************************************
        `);
    }
    log(message, color, err) {
        if(color && colors[color]) message = colors[color](message);
        if(err) return console.error(`${this.prefix()} ${message}`);
        console.log(`${this.prefix()} ${message}`);
    }
    logError(err){
        if(err.isAxiosError) {
            if(err.response) return this.log(`${err.response.status}: ${err.response.data}`, 'red', true);
            err = err.toJSON();
            return this.log(`${err.name}: ${err.message}`, 'red', true);
        }
        if(err.code) this.log(`${err.code}: ${err.message}`, 'red', true);
        if(err.stack) this.log(err.stack, 'red', true);
        this.log(err, 'red', true);
    }
    logInvalid(code, message){
        return {
            invalid: { code, message }
        }
    }
    logMadesession(){
        console.log(`${this.prefix()} created a new session`);
    }
    logInternalApiReady(){
        console.log(`${this.prefix()} All internal API's are ready`);
    }
}