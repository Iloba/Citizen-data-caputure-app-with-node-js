const Joi = require("joi");
const Citizen = require("../../model/Citizen");
const nodemailer = require('nodemailer');

const getAllCitizens = (req, res, next) => { };

const saveCitizen = async (req, res, next) => {

  await sendEmail();

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
    console.log(error);
  }

  //upload image using multer; (done)

  //get Nin and make request to NIN endpoint (wait)

  //store data


  //upload images
  //send email to citizen



  //save citizen to database
  const citizen = new Citizen();
  citizen.name = value.name;
  citizen.email = value.email;
  citizen.phone = value.phone;
  citizen.nin_number = value.nin_number;
  citizen.passport_photograph = value.passport_photograph;
  citizen.utility_bill = value.utility_bill;
  citizen.dependants = value.dependants;

  citizen.save();

  if (!citizen) {
    throw new Error("Something went wrong, could not save Citizen");
  }

  

  const result = {
    message: 'Created Citizen!',
    data: citizen
  };

};

const sendEmail = async () => {


// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Your SMTP server address
    port: 465, // Port for SMTP
    secure: true, // True for 465, false for other ports
    auth: {
        user: 'ilobatim@gmail.com', // Your email address
        pass: '$neymedia@2003' // Your email password or application-specific password
    }
});

// Define email options
const mailOptions = {
    from: 'sender@example.com', // Sender address
    to: 'ilobatimothy@gmail.com', // List of recipients
    subject: 'Subject of the email', // Subject line
    text: 'Plain text content of the email', // Plain text body
    html: '<p>HTML content of the email</p>' // HTML body
};

// Send mail
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred:', error);
    }
    console.log('Message sent:', info.messageId);
});
}

module.exports = {
  getAllCitizens,
  saveCitizen,
};
