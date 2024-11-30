class Authorization {
  static async login(req, res) {
    const { username, password } = req.body;
  }

  static async logout(req, res) {
    const { username } = req.body;
  }
}

module.exports = Authorization;
