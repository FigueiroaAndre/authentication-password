const connection = require('./connection');
const User = require('./models/User');

async function databaseDestruction(){
    try {
        await connection.drop();
    } catch (err){
        console.error("Something went wrong");
        console.error(err);
    }
}

databaseDestruction();

module.exports = databaseDestruction;
