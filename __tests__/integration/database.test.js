const dbConfig = require('../../src/database/config');
const connection = require('../../src/database/connection');

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

describe('Database connection', () => {

    afterAll(async () => {
        await connection.close();
    })

    test('Config for database in src/database/config.js is able to load environment variables.', () => {
        expect(dbConfig).toEqual({
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT
        });
    });

    test('It\'s possible to connect to the Database.', async () => {
        let connected;
        try {
            await connection.authenticate();
            connected = true;
        } catch (err) {
            connected = false;
        }
        expect(connected).toBe(true);
    });
});
