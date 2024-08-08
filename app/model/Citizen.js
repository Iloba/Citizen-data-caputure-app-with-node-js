const mongoose = require('mongoose');

const CitizenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long got {VALUE}'],
        maxlength: [50, 'Name must be at most 50 characters long'],
        unique: true,
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    passport_photograph: {
        type: String,
        required: true,
    },
    nin_number: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (nin) {
                const length = nin.toString().length;
                return length === 10;
            },
            message: props => `NIN number must be exactly 10 digits long. Got ${props.value}`,
        },
    },
    utility_bill: {
        type: String,
        required: true,
    },
    dependants: {
        type: [String],
        required: true,
    },
});

const Citizen = mongoose.model('Citizen', CitizenSchema);
module.exports = Citizen;