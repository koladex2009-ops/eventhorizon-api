const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must be alphanumeric',
      'string.min': 'Password must be at least 8 characters long',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };