const Joi = require("joi");

// Register Validation
const registerValidation = data => {
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(data);
};

// Login Validation
const loginValidation = data => {
	const schema = Joi.object({
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(data);
};

module.exports = { loginValidation, registerValidation };
