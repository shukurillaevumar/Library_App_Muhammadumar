const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    required: true,
    unique: true,
    type: String,
  },
  author: {
    required: true,
    type: String,
  },
  amount: {
    required: true,
    type: Number,
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
});

module.exports = mongoose.model("Book", bookSchema);