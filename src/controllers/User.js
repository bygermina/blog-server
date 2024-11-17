class UserController {
  getUser = (req, res) => {
    const userId = req.params.id;

    res.send(`User ID: ${userId}`);
  };

  createUser = (req, res) => {
    res.send('User created');
  };

  updateUser = (req, res) => {
    const userId = req.params.id;

    res.send(`User ID: ${userId}`);
  };
}

module.exports = new UserController();
