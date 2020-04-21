const { Router } = require('express');
const UserController = require('./controllers/UserController');

const ROUTES_PATH = {
    USER: '/users'
};

const routes = Router();

routes.get(ROUTES_PATH.USER, UserController.index );

module.exports = {
    routes,
    ROUTES_PATH
}
