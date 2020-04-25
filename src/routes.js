const { Router } = require('express');
const UserController = require('./controllers/UserController');

const ROUTES_PATH = {
    USER: '/user',
    REGISTER: '/register'
};

const routes = Router();

routes.get(ROUTES_PATH.USER, UserController.index );
routes.get(`${ROUTES_PATH.USER}/:login`, UserController.show);
routes.post(ROUTES_PATH.REGISTER, UserController.store);

module.exports = {
    routes,
    ROUTES_PATH
}
