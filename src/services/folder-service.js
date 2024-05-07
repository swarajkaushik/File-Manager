const Folder = require("../schemas/Folder");

class FolderService {
  async createFolder(payload) {
    try {
      const res = await Folder.findOne({
        where: {
          name: payload.name,
          user_id: payload.userId,
        },
      });
      if (res) {
        throw new Error("Folder already exists: " + payload.name);
      } else {
        const folder = await Folder.create({
          name: payload.name,
          user_id: payload.userId,
        });

        return folder;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = FolderService;
