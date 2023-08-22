const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middleware/auth.middleware");
const usersService = require("../service/user.service");

// Route to register a new user
router.post("/register", async (req, res) => {
  const { name, age, email, group, username, password } = req.body;

  if (!username || !password || !name || !age || !email || !group) {
    return res.status(400).json({
      error: "name age, email, group, username and password are required",
    });
  }

  const existingUser = await usersService.findUserByUsername(username);

  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  } else {
    await usersService.addUser(req, res);
  }
});

// Route to log in and get the token
router.post("/login", authenticate, (req, res) => {
  res.json({
    user: req.user,
    token: req.token,
  });
});

//get all
router.get("/", authorize, async (req, res) => {
  const users = await usersService.getUsers();
  res.json(users);
});

//get by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await usersService.getUserById(id));
});

//update student
router.put("/:id", (req, res) => {
  const { id } = req.params;
  //Validate input data
  const dataForUpdate = usersService.validateUpdateInput(req.body);
  // Update user data
  return usersService.updateUser( res, id, dataForUpdate );
});

//remove student
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  return usersService.removeUser(res, id);
});

router.post("/take", authorize, (req, res) => {
  const user = req.user;
  const bookId = req.body.bookId;
  return (usersService.takeBook(res, user, bookId));
});

router.post("/return", authorize, (req, res) => {
  return usersService.returnBook(res, req.user, req.body.bookId)
});

module.exports = router;
