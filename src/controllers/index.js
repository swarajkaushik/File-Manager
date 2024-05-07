const userController = require("./user-controller");
const folderController = require("./folder-controller");

const userControllerIns = new userController();
const folderControllerIns = new folderController();

module.exports = { userControllerIns, folderControllerIns };
