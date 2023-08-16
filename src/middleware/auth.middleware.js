const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { findUserByUsername } = require("../service/user.service");

function generateToken(user) {
  return jwt.sign(
    {
      name: user.name,
      username: user.username,
      role: user.role,
      blocked: user.blocked,
    },
    "your-secret-key",
    {
      expiresIn: "1hr",
    }
  );
}

// Middleware to check for a valid token before allowing access to the following routes
function authorize(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

async function authenticate(req, res, next) {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (!user) {
    return res
      .status(404)
      .json({ error: "User is not found: invalid username or password" });
  }

  if (user.blocked) {
    return res
      .status(403)
      .json({ error: "This account has been blocked by admin" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = generateToken(user);
  req.user = { name: user.name, role: user.role };
  req.token = token;
  next();
}

module.exports = {
  authenticate,
  authorize,
};
