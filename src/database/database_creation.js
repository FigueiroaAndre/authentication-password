const connection = require('./connection');
const User = require('./models/User');

async function databaseSync(){
    try{
        await connection.sync();
    } catch (err) {
        console.error("Something went wrong");
        console.error(err);
    }
}

databaseSync();

module.exports = databaseSync;
