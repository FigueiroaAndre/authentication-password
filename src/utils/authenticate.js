const User = require('../database/models/User');
const bcrypt = require('bcrypt');
const { ROUTES_PATH } = require('../routes');

async function authenticateUser(request, response) {
    const { login, password } = request.body;
    try {
        const user = await User.findOne({
            where: {
                login
            }
        });
        console.log(user);
        if (!user) return response.json({ message: 'Invalid login'});
        const passwordMatched = await bcrypt.compare(password,user.hashedPassword);
        if (!passwordMatched) return response.json({ message: 'Invalid password'});
        return response.json({
            login: user.login,
            about: user.about
        });
    } catch (err) {
        return response.json(err);
    }
}

module.exports = authenticateUser;