const Book = require("../database/models/book.model");

async function getAll() {
  return await Book.find();
}

async function getById(res, id) {
  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ error: "Book is not found" });
  }
  return res.status(200).json(book);
}

async function create(res, { title, author, amount }) {
  const book = await new Book({
    title,
    author,
    amount,
  });

  try {
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function update(id, dataForUpdate, res) {
  try {
    const book = await Book.findByIdAndUpdate(id, dataForUpdate, {new: true});

    if(!book) {
      res.status(404).json({error: "Book is not found"});
    } else {
      res.json({result: "Book was successfully updated"});
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function changeAmount (id, amount) {
  const bookAmount = amount < 0 ? 0 : amount;
  try {
    const book = await Book.findByIdAndUpdate(id, {amount: bookAmount}, {new: true});

    if(!book) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

function validateCreateInputs(req, res) {
  const { title, author, amount } = req.body;
  const result = {};

  if (!title) {
    return res.status(404).json({ error: "title is not found" });
  }

  result.title = title;

  if (!author) {
    return res.status(404).json({ error: "author is not found" });
  }
  result.author = author;

  if (!amount) {
    return res.status(404).json({ error: "amount is not found" });
  }
  result.amount = amount;

  return result;
}

function validateUpdateInputs({ title, author, amount }) {
  const result = {};
  if (title) {
    result.title = title;
  }
  if (author) {
    result.author = author;
  }
  if (amount) {
    result.amount = amount;
  }

  return result;
}

async function remove(res, id) {
  try {
    const book = await Book.findByIdAndDelete(id);
    if(!book) {
      res.status(404).json("Book is not found");
    } else {
      res.send("Book has been deleted");
    }
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validateCreateInputs,
  validateUpdateInputs,
  changeAmount
};