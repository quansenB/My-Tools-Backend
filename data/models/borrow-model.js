const db = require("../config.js");

module.exports = {
  getTransactionById,
  getLendingHistoryByUserid,
  getBorrwoingHistoryByUserid,
  request,
  accept,
  takeBack
};

function getTransactionById(id) {
  return db("borrowing_history")
    .where({ id })
    .first();
}

function getLendingHistoryByUserid(owner_id) {
  return db("borrowing_history").where({ owner_id });
}

function getBorrwoingHistoryByUserid(borrower_id) {
  return db("borrowing_history").where({ borrower_id });
}

async function request(tool_id, borrower_id) {
  const owner_id = await db("tools")
    .where({ id: tool_id })
    .select("owner_id")
    .first();
  return db("borrowing_history")
    .insert({ owner_id, tool_id, borrower_id, status: "requested" })
    .then(ids => {
      return getTransactionById(ids[0]);
    });
}

function accept(id) {
  return db("borrowing_history")
    .where({ id })
    .update({ status: "accepted", start_date: new Date() });
}

function takeBack(id) {
  return db("borrowing_history")
    .where({ id })
    .update({ status: "completed", end_date: new Date() });
}
