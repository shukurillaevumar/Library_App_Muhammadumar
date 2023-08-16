const Book = require("../database/models/book.model");

async function getAll() {
  return await Book.find();
}

async function getById(res, id) {
  const book = await Book.findById(id);
  if(!book) {
    return res.status(404).json({error: "Book is not found"});
  } else {
    return res.status(200).json(book);
  }
}

async function create(res, dataForCreate) {
  const book = new Book(dataForCreate);

  try {
    await book.save();
    res.status(201).json(book);
  } catch(err) {
    res.status(404).json({ message: err, message });
  }
}

function update(id, updateParams) {
  const index = library.findIndex((book) => {
    return book.id === id;
  });

  if (index === -1) {
    return {
      error: "Book is not found",
    };
  } else {
    library[index] = { ...library[index], ...updateParams };
    return {
      result: "Book has been successfully updated",
      updatedBook: library[index],
    };
  }
}

function validateCreateInputs(req, res) {
  const { title, author, amount } = req.body
  const result = {};

  if (!title) {
    return res.status(404).json({err: "title is not found"});
  }

  result.title = title;

  if (!author) {
    return res.status(404).json({err: "author is not found"});
  }
  result.author = author;

  if (!amount) {
    return res.status(404).json({err: "amount is not found"});
  }
  result.amount = amount;

  return result;
}

function validateUpdateInputs({ title, author, createdAt }) {
  const result = {};
  if (title) {
    result.title = title;
  }
  if (author) {
    result.author = author;
  }
  if (createdAt) {
    result.createdAt = createdAt;
  }
  if (Object.keys(result).length === 0) {
    return {
      status: 400,
      message: "At least one field should be filled",
      result,
    };
  } else {
    return {
      status: 200,
      message: "Successfully validated",
      result,
    };
  }
}

function remove(id) {
  const index = library.findIndex((book) => {
    return book.id === id;
  });
  if (index === -1) {
    return {
      error: "Book is not found",
    };
  } else {
    const deletedBook = library.splice(index, 1);
    return {
      result: "Successfully deleted",
      deletedBook,
    };
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
};
