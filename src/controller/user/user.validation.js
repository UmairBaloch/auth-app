import Joi from "joi";

export const getUsersValidation = {
  query: Joi.object().keys({
    limit: Joi.number().optional(),
  }),
};

export const createUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    phone: Joi.string().optional().allow("", null),
  }),
};
