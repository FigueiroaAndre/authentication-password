const User = require('../database/models/User');

module.exports = {

    async index(request,response){
        const allUsers = await User.findAll({
            attributes: ['login', 'about']
        });
        return response.status(200).json(allUsers);
    }
}