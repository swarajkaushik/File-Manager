const { validationResult } = require("express-validator");
const { folderServiceIns } = require("../services/index");

class FolderController {
  async createFolder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const reqObj = {
        name: req.body.name,
        userId: req.user.id,
      };
      const response = await folderServiceIns.createFolder(reqObj);
      if (!response) {
        return res.status(500).json({
          data: {},
          success: false,
          message: "Folder already exists",
        });
      } else if (response) {
        return res.status(201).json({
          data: response,
          success: true,
          error: {},
          message: "Successfully created the folder",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        data: {},
        success: false,
        err: error,
        message: "Cannot create the folder",
      });
    }
  }
}

module.exports = FolderController;
