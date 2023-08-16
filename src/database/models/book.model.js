const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    author: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    amount: {
        required: true,
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Book", bookSchema);