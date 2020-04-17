const databaseSync = require('./database_creation');
const databaseDestruction = require('./database_destruction');

async function databaseReset(){
    await databaseSync();
    await databaseDestruction();
}
