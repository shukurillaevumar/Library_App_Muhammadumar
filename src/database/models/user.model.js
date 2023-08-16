const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    group: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    blocked: {
        required: true,
        type: Boolean
    },
    taken:[],
    returned:[],
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("Users", userSchema);