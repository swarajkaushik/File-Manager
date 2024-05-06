const User = require("../schemas/user");

class UserService {
  async postBook(payload) {
    try {
      const result = await User.create(payload);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserService;
