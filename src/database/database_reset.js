const databaseCreation = require('./database_creation');
const databaseDestruction = require('./database_destruction');

async function databaseReset(){
    await databaseCreation();
    await databaseDestruction();
}

module.exports = databaseReset;