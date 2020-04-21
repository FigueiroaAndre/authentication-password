const databaseCreation = require('./database_creation');
const databaseDestruction = require('./database_destruction');

async function databaseReset(){
    await databaseDestruction();
    await databaseCreation();
}

module.exports = databaseReset;