const Profile = require('../models/Profile');

const PROFILE_NOT_FOUND = 'Профиль не найден';

class ProfileController {
  async getProfile(req, res) {
    try {
      const username = req.params.username;
      const profile = await Profile.findOne({ where: { username } });

      if (!profile) {
        return res.status(404).json({ error: PROFILE_NOT_FOUND });
      }

      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const { id, username, avatar, first, lastname, age } = req.body;

      const profile = await Profile.findByPk(id);

      if (!profile) {
        return res.status(404).json({ error: PROFILE_NOT_FOUND });
      }

      await profile.update({
        username,
        avatar,
        first,
        lastname,
        age,
      });

      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProfileController();
