const User = require('../database/models/User');
const { validateUser } = require('../utils/validator');
const bcrypt = require('bcrypt');

module.exports = {

    async index(request, response){
        const allUsers = await User.findAll({
            attributes: ['login', 'about']
        });
        return response.status(200).json(allUsers);
    },

    async show(request, response){
        user = await User.findOne({
            attributes: ['login', 'about'],
            where: {
                login: request.params.login
            }
        });
        if ( user ) return response.status(200).json(user);
        return response.status(404).json({
            message: 'user not found'
        });
    },

    async store(request, response){
        const validationError = validateUser(request.body);
        if ( validationError.error ) return response.status(400).json(validationError);
        try {
            hashedPassword = await bcrypt.hash(request.body.password,11);
            await User.create({
                login: request.body.login,
                hashedPassword,
                about: request.body.about
            });
            return response.status(201).json({
                login: request.body.login,
                about: request.body.about
            })
        } catch (e){
            return response.status(400).json(e);
        }
    }
}
