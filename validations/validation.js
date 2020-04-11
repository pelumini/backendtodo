const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        firstname: Joi.string().min(6).required(),
        middlename: Joi.string().allow('').optional(),
        lastname: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;