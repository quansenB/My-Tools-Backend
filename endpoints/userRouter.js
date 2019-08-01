const express = require("express");
const Users = require("../data/models/users-model.js");
const Tools = require("../data/models/tools-model.js");
const router = express.Router();
const auth = require("../middleware/restricted.js");

router.get("/", async (req, res) => {
  try {
    const users = await Users.getAllUsers();
    if (users.lenght > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ message: "no user found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getUserById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "no user found with this id" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const user = await Users.getUserByUsername(req.params.name);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "no user found with this name" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/", auth.restricted, async (req, res) => {
  try {
    const user = await Users.updateUser(req.user.id, req.body);
    if (user) {
      return res.status(204).json(user);
    } else {
      return res.status(400).json({ message: "user could not be updated" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/", auth.restricted, async (req, res) => {
  try {
    const num = await Users.deleteUser(req.user.id);
    if (num > 0) {
      return res.status(204).json({ message: "user deleted" });
    } else {
      return res.status(400).json({ message: "user could not be deleted" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/borrowings/", auth.restricted, async (req, res) => {
  try {
    const borrowings = await Users.getBorrowingsByUserId(req.user.id);
    if (borrowings.lenght > 0) {
      return res.status(200).json(borrowings);
    } else {
      return res.status(404).json({ message: "user did not borrow anything" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/borrowed/", auth.restricted, async (req, res) => {
  try {
    const borrowed = await Users.getBorrowedByUserId(req.user.id);
    if (borrowed.lenght > 0) {
      return res.status(200).json(borrowed);
    } else {
      return res
        .status(404)
        .json({ message: "user did not lend out anything" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/tool/:id/owner", async (req, res) => {
  try {
    const owner = await Users.getOwnerByToolId(req.params.id);
    if (owner) {
      return res.status(200).json(owner);
    } else {
      return res
        .status(404)
        .json({ message: "No tool with this id available" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/tool/:id/borrower", auth.restricted, async (req, res) => {
  try {
    const tool = await Tools.getToolById(req.params.id);
    if (tool.owner_id !== req.user.id) {
      return res
        .status(401)
        .json({ message: "you don't have authorisation for this tool" });
    }
    const borrower = await Users.getBorrowerByToolId(req.params.id);
    if (borrower) {
      return res.status(200).json(borrower);
    } else {
      return res
        .status(404)
        .json({ message: "No tool with this id available" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
