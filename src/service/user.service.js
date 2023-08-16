const bcrypt = require("bcrypt");
const User = require("../database/models/user.model");
const bookService = require("./books.service");

// Function to add a new user
async function addUser(req, res) {
  const { name, age, email, group, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await new User({
    name,
    age,
    email,
    group,
    username,
    blocked: false,
    taken: [],
    returned: [],
    password: hashedPassword,
    role: "USER",
  });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Function to find a user by username
async function findUserByUsername(username) {
  try {
    return await User.findOne({ username: username }).exec();
  } catch(err) {
    throw err;
  }
}

async function getUsers() {
  return await User.find();
}

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

async function updateUser(res, id, dataForUpdate) {
    try {
        const user = await User.findByIdAndUpdate(id, dataForUpdate, {new: true});
        if(!user) {
            res.status(404).json({ error: "User is not found" });
        } else {
            res.json(user)
        }
    } catch (err) {
        throw err;
    }
}

async function removeUser(res, id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if(!user) {
      res.status(404).json("User is not found");
    } else {
      res.send("User has been deleted...");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

function validateCreateInput(params) {
  const newUser = {};
  newUser.id = uuidv4();
  const { name, age, group, email } = params;
  if (!name) {
    throw new Error("name field is not found");
  }
  newUser.name = name;

  if (!age) {
    throw new Error("age field is not found");
  }
  newUser.age = age;

  if (!group) {
    throw new Error("group field is not found");
  }
  newUser.group = group;

  if (!email) {
    throw new Error("email field is not found");
  }
  newUser.email = email;

  newUser.blocked = false;
  newUser.taken = [];
  newUser.returned = [];

  return newUser;
}

const takeBook = (user, bookId) => {
  if (user.role === "STUDENT") {
    if (user.blocked) throw new Error("You are blocked by admin");
    const { book } = bookService.getById(bookId);
    const index = UsersDB.findIndex((student) => {
      return student.username === user.username;
    });
    UsersDB[index].taken.push({
      book_id: book.id,
      time: Date.now(),
    });
    return UsersDB[index];
  } else {
    throw new Error("You don't have a right to rent a book");
  }
};

const returnBook = () => {};

const validateUpdateInput = (params) => {
  const { name, age, group, email, blocked, role, username, password } = params;
  const res = {};

  if (name) res.name = name;
  if (age) res.age = age;
  if (group) res.group = group;
  if (email) res.email = email;
  if (blocked) res.blocked = blocked;
  if (role) res.role = role;
  if (username) res.username = username;
  if (password) res.password = password;

  return res;
};

module.exports = {
  addUser,
  getUserById,
  getUsers,
  updateUser,
  removeUser,
  takeBook,
  returnBook,
  validateCreateInput,
  validateUpdateInput,
  findUserByUsername,
};
