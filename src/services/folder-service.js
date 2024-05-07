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

  async createSubFolder(payload, res) {
    try {
      const parentFolder = await Folder.findOne({
        where: { id: payload?.parent_id, user_id: payload?.user_id },
      });
      if (!parentFolder) {
        return res.status(404).json({
          error: "Parent folder not found or you do not have permission",
        });
      }

      const data = await Folder.findOne({
        where: {
          name: payload.name,
          parent_id: payload.parent_id,
          user_id: payload.user_id,
        },
      });

      if (data) {
        return res.status(404).json({
          error: "Sub folder already exists",
        });
      }

      const subfolder = await Folder.create(payload);
      res.status(201).json(subfolder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Invalid input" });
    }
  }
}

module.exports = FolderService;
