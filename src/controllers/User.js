const User = require('../models/User');
const decodeToken = require('../utils/token');

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

  getUserDataByToken = async (req, res) => {
    try {
      const token = req.headers['authorization'];

      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const decoded = decodeToken(token);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = new UserController();
