const express = require("express");
const Tools = require("../data/models/tools-model.js");
const router = express.Router();
const auth = require("../middleware/restricted.js");

router.get("/", async (req, res) => {
  try {
    const tools = await Tools.getAllTools();
    if (tools.lenght > 0) {
      return res.status(200).json(tools);
    } else {
      return res.status(404).json({ message: "no tool found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tools = await Tools.getToolById(id);
    if (tool) {
      return res.status(200).json(tool);
    } else {
      return res
        .status(404)
        .json({ message: "no tool with this id available" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const tools = await Tools.getToolsByName(name);
    if (tools.length > 0) {
      return res.status(200).json(tools);
    } else {
      return res
        .status(404)
        .json({ message: "no tool with this name available" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", auth.restricted, async (req, res) => {
  try {
    req.body.owner_id = req.user.id;
    const tool = await Tools.insertTool(req.body);
    if (tool) {
      return res.status(201).json(tool);
    } else {
      return res.status(400).json({ message: "tool could not be created" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id", auth.restricted, async (req, res) => {
  try {
    const tool = await Tools.getToolById(req.params.id);
    if (tool.owner_id !== req.user.id) {
      return res
        .status(401)
        .json({ message: "you don't have authorisation to modify this tool" });
    }
    tool = null;
    tool = await Tools.updateTool(req.params.id, req.body);
    if (tool) {
      return res.status(204).json(tool);
    } else {
      return res.status(400).json({ message: "tool could not be updated" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/:id", auth.restricted, async (req, res) => {
  try {
    const tool = await Tools.getToolById(req.params.id);
    if (tool.owner_id !== req.user.id) {
      return res
        .status(401)
        .json({ message: "you don't have authorisation to delete this tool" });
    }
    const num = await Tools.deleteTool(req.params.id);
    if (num > 0) {
      return res.status(204).json({ message: "tool deleted" });
    } else {
      return res.status(400).json({ message: "tool could not be deleted" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;