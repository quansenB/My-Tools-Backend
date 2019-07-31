const db = require("../data/dbConfig.js");

module.exports = {
  getAllTools,
  getToolById,
  getToolsByName,
  insertTool,
  updateTool,
  deleteTool
};

function getAllTools() {
  return db("tools");
}

function getToolById(id) {
  return db("tools")
    .where({ id })
    .first();
}

function getToolsByName(name) {
  return db("tools").where({ name });
}

function insertTool(newTool) {
  return db("tools")
    .insert(newTool)
    .then(ids => {
      return getToolById(ids[0]);
    });
}

function updateTool(id, updatedTool) {
  return db("tools")
    .where({ id })
    .update(updatedTool)
    .then(res => {
      if (res === 1) {
        return getToolById(id);
      } else {
        return null;
      }
    });
}

function deleteTool(id) {
  return db("tools")
    .where({ id })
    .del();
}
