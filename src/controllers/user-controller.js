const userServiceIns = require("../services/index");

class UserController {
  async postUser(req, res) {
    try {
      const response = await userServiceIns.postUser(req.body);
      return res.status(201).json({
        data: response,
        success: true,
        error: {},
        message: "Successfully created the user",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        data: {},
        success: false,
        err: error,
        message: "Cannot create the user",
      });
    }
  }

  async loginUser(req, res) {
    try {
      const response = await userServiceIns.loginUser(req.body, res);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserController;
