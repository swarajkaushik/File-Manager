const express = require("express");
const userControllerIns = require("../controllers/index");
const router = express.Router();

router.post("/user/create", async (req, res) => {
  const result = await userControllerIns.postUser(req, res);
  return result;
});

router.post("/user/login", async (req, res) => {
  const result = await userControllerIns.loginUser(req, res);
  return result;
});

module.exports = router;
