const User = require('../database/models/User');

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
    }
}
