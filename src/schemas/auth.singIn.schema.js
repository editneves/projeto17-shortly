import joi from "joi";

export const authSchemaSignIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
