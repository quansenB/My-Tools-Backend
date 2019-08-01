const db = require("../config.js");

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  insertUser,
  updateUser,
  deleteUser,
  getBorrowingsByUserId,
  getBorrowedByUserId,
  getOwnerByToolId,
  getBorrowerByToolId,
  getReviewsByUserId
};

function getAllUsers() {
  return db("users");
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function insertUser(newUser) {
  return db("users")
    .insert(newUser)
    .then(ids => {
      return getUserById(ids[0]);
    });
}

function updateUser(id, updatedUser) {
  return db("users")
    .where({ id })
    .update(updatedUser)
    .then(res => {
      if (res === 1) {
        return getUserById(id);
      } else {
        return null;
      }
    });
}

function deleteUser(id) {
  return db("users")
    .where({ id })
    .del();
}

function getBorrowingsByUserId(owner_id) {
  return db("users")
    .join("tools", "users.id", "tools.owner_id")
    .where({ owner_id })
    .select("tools.id", "tools.name", "tools.decription");
}

function getBorrowedByUserId(borrower_id) {
  return db("users")
    .join("tools", "users.id", "tools.owner_id")
    .where({ borrower_id })
    .select("tools.id", "tools.name", "tools.decription");
}

function getOwnerByToolId(tool_id) {
  return db("users")
    .join("tools", "users.id", "tools.owner_id")
    .where({ tool_id })
    .select("users.id", "users.name", "users.location");
}

function getBorrowerByToolId(tool_id) {
  return db("users")
    .join("tools", "users.id", "tools.borrower_id")
    .where({ tool_id })
    .select("users.id", "users.name", "users.location");
}

function getReviewsByUserId(id) {}
