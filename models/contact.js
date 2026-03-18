const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
    },
    favoriteColor: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: [true, "Birthday is required."]
    }
});

module.exports = mongoose.model("Contact", contactSchema);