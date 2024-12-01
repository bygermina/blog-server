const express = require('express');

const { authenticate, authorize } = require('./middleware/auth');
const UserController = require('./controllers/User');
const ArticleController = require('./controllers/Article');
//const RatingController = require('./controllers/Rating');
const Authorization = require('./controllers/Authorization');
const ProfileController = require('./controllers/Profile');

const router = express.Router();

const routes = {
  user: '/users',
  article: '/articles',
  rating: '/article-ratings',
  login: '/login',
  register: '/register',
  profile: '/profile',
  comment: '/comments',
};

router.post(routes.login, Authorization.login);
router.post(routes.register, Authorization.register);
//router.post(routes.logout, Authorization.logout);

router.get(`${routes.profile}/:id`, ProfileController.getProfile);
router.put(`${routes.profile}/:id`, ProfileController.updateProfile);

router.get(`${routes.user}/:id`, UserController.getUser);
router.post(routes.user, UserController.createUser);
router.patch(`${routes.user}/:id`, UserController.updateUser);

router.get(`${routes.article}/:id`, ArticleController.getArticle);
router.post(
  routes.article,
  authenticate,
  authorize(['admin']),
  ArticleController.createArticle,
);
router.patch(`${routes.article}/:id`, ArticleController.updateArticle);

// router.get(`${routes.rating}/:id`, RatingController.getRating);
// router.post(routes.rating, RatingController.createRating);

module.exports = router;
