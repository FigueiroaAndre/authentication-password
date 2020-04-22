const connection = require('../../src/database/connection');
const User = require('../../src/database/models/User');
const bcrypt = require('bcrypt');
const request = require('supertest');
const express = require('express');
const { routes, ROUTES_PATH } = require('../../src/routes');

const app = express();
app.use(express.json());
app.use(routes);

describe('UserController methods', () => {

    beforeAll(async () => {
        await User.destroy({ truncate: true});
        hashedPassword = await bcrypt.hash('?andREfigu31roaGG',11);
        await User.bulkCreate([
            { login: 'andrefig', hashedPassword, about: 'hello test'},
            { login: 'crisCR7' , hashedPassword, about: 'GOAT'},
            { login: 'wesley', hashedPassword}
        ]);
    });

    afterAll(async () => {
        await connection.close();
    });

    test('Index method lists all users', async () => {
        const response = await request(app)
            .get(ROUTES_PATH.USER)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual([
            { login: 'andrefig', about: 'hello test'},
            { login: 'crisCR7', about: 'GOAT'},
            { login: 'wesley', about: ''}
        ]);
    });

    test('Show method shows the user specified', async () => {
        const response = await request(app)
            .get(`${ROUTES_PATH.USER}/andrefig`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual({
            login: 'andrefig',
            about: 'hello test'
        });
    });

    test('Show method must return a message if specified user is not registered', async () => {
        const response = await request(app)
            .get(`${ROUTES_PATH.USER}/idontexist`)
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body).toEqual({
            message: 'user not found'
        });
    });
});
