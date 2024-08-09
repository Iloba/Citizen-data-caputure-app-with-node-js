const Joi = require("joi");
const Citizen = require("../../model/Citizen");

const getAllCitizens = (req, res, next) => {};

const saveCitizen = (req, res, next) => {
  console.log(req.files);
  //validate
  const CitizenSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
    passport_photograph: Joi.string()
      .pattern(/\.(jpg|jpeg|png)$/i)
      .required()
      .messages({
        "string.pattern.base":
          "Photo must be a valid image file with jpg, jpeg, or png extension.",
      }),
    nin_number: Joi.number()
      .required()
      .custom((value, helpers) => {
        if (value.toString().length !== 10) {
          return helpers.message("NIN number must be exactly 10 digits long");
        }
        return value;
      }),
    utility_bill: Joi.string()
      .pattern(/\.(jpg|jpeg|png)$/i)
      .required()
      .messages({
        "string.pattern.base":
          "Utility Bill must be a valid image file with jpg, jpeg, or png extension.",
      }),
    dependants: Joi.array().items(Joi.string()).required(),
  });

  const { error, value } = CitizenSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw new Error(error);
  }

  //upload image using multer;

  //get Nin and make request to NIN endpoint

  //store data

  //upload images

  //save citizen to database

  //send email to citizen
};

module.exports = {
  getAllCitizens,
  saveCitizen,
};
