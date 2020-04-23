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

    test('Store method must register a new user in database', async () => {
        const newUser = {
            login: 'zidane',
            password: '-!@number10FranceZZ',
            about: 'current real madrid coach'
        };
        let response = await request(app)
            .post(ROUTES_PATH.USER)
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(201);
        expect(response.body).toEqual({
            login: newUser.login,
            about: newUser.about
        });
        response = await request(app)
            .get(`${ROUTES_PATH.USER}/${newUser.login}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual({
                login: newUser.login,
                about: newUser.about
        });
    });

    test('Store method must be able to validate data before make a query to database', async () => {
        const newUser = {
            login: 'an',
            password: '?andREfigu31roaGG' 
        };
        const response = await request(app)
            .post(ROUTES_PATH.USER)
            .send(newUser)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.error.name).toBe('ValidationError');
        expect(response.body.error.details[0].message).toBe('"login" length must be at least 3 characters long');
    });
});
