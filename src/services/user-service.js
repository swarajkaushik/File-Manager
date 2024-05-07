const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sequelize = require("../config/sequelize");
const password_key = process.env.PASSWORD_KEY;

class UserService {
  async postUser(payload) {
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;

      // Generate token
      const token = jwt.sign({ id: payload.id }, password_key);
      payload.tokens = [token];

      // Create the user
      const result = await User.create(payload);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async loginUser(payload, res) {
    try {
      const { email, password } = payload;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, password_key);

      // Push the generated token into the user's tokens array
      user.tokens.push(token);

      // Save the updated user record with the new token
      await sequelize.query(
        "UPDATE users SET tokens = array_append(tokens, ?) WHERE id = ?",
        {
          replacements: [token, user.id],
          type: sequelize.QueryTypes.UPDATE,
        }
      );
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = UserService;
