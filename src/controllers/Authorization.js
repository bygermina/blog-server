const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Profile = require('../models/Profile');

const secret = process.env.SECRET;

class Authorization {
  async register(req, res) {
    try {
      const { username, password, roles } = req.body;
      const user = await User.create({ username, password, roles: ['viewer'] });

      await Profile.create({
        userId: user.id,
        username,
        first: '',
        lastname: '',
        age: 0,
        avatar: '',
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user || !(await user.validPassword(password))) {
        return res.status(401).json({ error: 'Неправильный логин или пароль' });
      }

      const token = jwt.sign({ id: user.id, roles: user.roles }, secret, {
        expiresIn: '24h',
      });

      res.json({ token, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new Authorization();
