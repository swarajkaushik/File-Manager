const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db-config");
const UserRoutes = require("./routes/user-routes");
const FolderRoutes = require("./routes/folder-routes");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());

const setupAndStartServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", UserRoutes);
  app.use("/api", FolderRoutes);
  app.listen(PORT, async () => {
    console.log(`Server started on port: ${PORT}`);
    await connect();
  });
};

setupAndStartServer();
