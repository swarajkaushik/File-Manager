const express = require("express");
const auth = require("../middlewares/auth");
const { folderControllerIns } = require("../controllers/index");

const router = express.Router();
router.post("/folders/create", auth, async (req, res) => {
  const result = await folderControllerIns.createFolder(req, res);
  return result;
});

router.post("/folders/:parentId/subfolder", auth, async (req, res) => {
  const result = await folderControllerIns.createSubFolder(req, res);
  return result;
});

module.exports = router;
