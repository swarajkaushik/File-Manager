const express = require("express");
const auth = require("../middlewares/auth");
const { folderControllerIns } = require("../controllers/index");

const router = express.Router();
router.post("/folders", auth, async (req, res) => {
  const result = await folderControllerIns.createFolder(req, res);
  return result;
});

module.exports = router;
