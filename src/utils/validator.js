const Joi = require('joi');

function validateUser(userObj){
    const UserValidatorSchema = Joi.object({
        login: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

        password: Joi.string()
                .min(16)
                .max(32)
                .regex(/[a-z]+/)
                .regex(/[A-Z]+/)
                .regex(/[0-9]+/)
                .regex(/\W+/)
                .regex(/^\S*$/)
                .required(),
        
        about: Joi.string()
                .max(300)
    });

    return UserValidatorSchema.validate(userObj);
}

module.exports = { validateUser };
