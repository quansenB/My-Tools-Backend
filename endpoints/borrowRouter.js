const express = require("express");
const History = require("../data/models/borrow-model.js");
const Tools = require("../data/models/tools-model.js");
const router = express.Router();
const auth = require("../middleware/restricted.js");

//request(borrower), accept(owner), giveback(borrower), [review(owner)], see(both owner and borrower)

router.get("/owner", auth.restricted, async (req, res) => {
  try {
    const lendings = await History.getLendingHistoryByUserid(req.user.id);
    if (Lendings.length > 1) {
      return res.status(200).json(lendings);
    } else {
      return res
        .status(404)
        .json({ message: "No lendings found for this user" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/borrower", auth.restricted, async (req, res) => {
  try {
    const lendings = await History.getBorrwoingHistoryByUserid(req.user.id);
    if (Lendings.length > 1) {
      return res.status(200).json(lendings);
    } else {
      return res
        .status(404)
        .json({ message: "No borrowings found for this user" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/request", auth.restricted, async (req, res) => {
  try {
    const tool = await Tools.getToolById(req.body.tool_id);
    if (tool.borrower_id) {
      return res.status(400).json({ message: "this tool is already lend out" });
    }
    const transaction = await History.request(req.body.tool_id, req.user.id);
    if (transaction) {
      return res.status(200).json(transaction);
    } else {
      return res.status(400).json({ message: "Request invalid" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/accept", auth.restricted, async (req, res) => {
  try {
    const transaction = await History.getTransactionById(req.body.transaction_id);
    const tool = await Tools.getToolById(transaction.tool_id);
    if (tool.borrower_id) {
      return res.status(400).json({ message: "this tool is already lend out" });
    }
    if (tool.owner_id !== req.user.id) {
      return res
        .status(400)
        .json({ message: "You're not authorized to do that" });
    }
    transaction = null;
    transaction = await History.accept(req.body.transaction_id);
    if (transaction) {
      await Tools.updateTool(tool.id, {
        ...tool,
        borrower_id: transaction.borrower_id
      });
      return res.status(200).json(transaction);
    } else {
      return res.status(400).json({ message: "Request invalid" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/takeback", auth.restricted, async (req, res) => {
  try {
    const transaction = await History.getTransactionById(req.body.transaction_id);
    const tool = await Tools.getToolById(transaction.tool_id);
    if (tool.owner_id !== req.user.id) {
      return res
        .status(400)
        .json({ message: "You're not authorized to do that" });
    }
    transaction = null;
    transaction = await History.takeBack(req.body.transaction_id);
    if (transaction) {
      await Tools.updateTool(tool.id, {
        ...tool,
        borrower_id: null
      });
      return res.status(200).json(transaction);
    } else {
      return res.status(400).json({ message: "Request invalid" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

await Tools.updateTool(tool.id, { ...tool, bor });
