const databaseCreation = require('./database_creation');
const databaseDestruction = require('./database_destruction');
const databaseReset = require('./database_reset');


switch(process.env.DB_FUNCTION){
    case 'create':
        databaseCreation();
        break;
    case 'destroy':
        databaseDestruction();
        break;
    case 'reset':
        databaseReset();
        break;
    deault:
        break;
}