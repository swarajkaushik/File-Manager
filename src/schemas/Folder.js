const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");

const Folder = sequelize.define(
  "Folder",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    parent_id: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "parent_id",
    },
  },
  {
    tableName: "folders", // Specify the actual table name in the database
    timestamps: false,
  }
);

// associate this model with the user's model
Folder.belongsTo(User, { foreignKey: "user_id" });
Folder.belongsTo(Folder, { foreignKey: "parent_id", as: "parentFolder" });
Folder.hasMany(Folder, { foreignKey: "parent_id", as: "subfolders" });

module.exports = Folder;
