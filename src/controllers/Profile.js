class ProfileController {
  getProfile(req, res) {
    const id = req.params.profileId;
  }

  updateProfile(req, res) {
    const id = req.params.profileId;
  }

  // id?: string;
  // first?: string;
  // lastname?: string;
  // age?: number;
  // currency?: Currency;
  // country?: Country;
  // city?: string;
  // username?: string;
  // avatar?: string;
}

module.exports = new ProfileController();
