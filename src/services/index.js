const userService = require("./user-service");
const folderService = require("./folder-service");

const userServiceIns = new userService();
const folderServiceIns = new folderService();

module.exports = { userServiceIns, folderServiceIns };
