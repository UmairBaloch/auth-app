import Joi from "joi";

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    console.log("Error occurred while validation", JSON.stringify(error));
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    let response = {
      status: 400,
      message: errorMessage,
      data: [],
      success: false,
    };
    return next(res.status(400).send(response));
  }
  Object.assign(req, value);
  return next();
};
