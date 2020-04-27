const { Router } = require('express');
const UserController = require('./controllers/UserController');
const authenticateUser = require('./utils/authenticate');

const ROUTES_PATH = {
    USER: '/user',
    REGISTER: '/register',
    LOGIN: '/login'
};

const routes = Router();

routes.get(ROUTES_PATH.USER, UserController.index );
routes.get(`${ROUTES_PATH.USER}/:login`, UserController.show);
routes.post(ROUTES_PATH.REGISTER, UserController.store);
routes.post(ROUTES_PATH.LOGIN, authenticateUser);

module.exports = {
    routes,
    ROUTES_PATH
}
