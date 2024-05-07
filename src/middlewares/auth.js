const { verify } = require("jsonwebtoken");
const User = require("../schemas/user");
require("dotenv").config();
const password_key = process.env.PASSWORD_KEY;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = verify(token, password_key);
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!user || user.tokens.length === 0) {
      throw new Error();
    }

    if (user.tokens.includes(token)) {
      req.token = token;
      req.user = user;
      next();
    } else {
      res.status(401).send({ error: "Please authenticate." });
    }
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
