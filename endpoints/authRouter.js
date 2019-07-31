const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../data/models/users-model.js");

router.post("/register", checkCredentials, async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 12);
    const user = await Users.insertUser(req.body);
    if (user) {
      const token = generateToken(user);
      return res.status(201).json(token);
    } else {
      return res.status(400).json({ message: "user could not be created" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", checkCredentials, async (req, res) => {
  try {
    const user = await Users.getUserByUsername(req.body.username);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user);
      return res.status(201).json(token);
    } else {
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function checkCredentials(req, res, next) {
  if (req.body.password.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be min. 8 characters long" });
  } else if (req.body.username.length < 8) {
    return res
      .status(400)
      .json({ message: "username must be min. 8 characters long" });
  } else {
    next();
  }
}
