class RatingController {
  getRating = (req, res) => {
    const ratingId = req.params.id;

    res.send(`Rating ID: ${ratingId}`);
  };

  createRating = (req, res) => {
    res.send('Rating created');
  };
}

module.exports = new RatingController();
