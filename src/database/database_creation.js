const connection = require('./connection');
const User = require('./models/User');

async function databaseCreation(){
    try{
        await connection.sync();
    } catch (err) {
        console.error("Something went wrong");
        console.error(err);
    }
}

module.exports = databaseCreation;
