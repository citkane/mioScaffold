const { config } = require('@mio/mioscaffold');
const bustype = config.mioApp.BUS.type;

module.exports = require(`./lib/mio${bustype}.js`)