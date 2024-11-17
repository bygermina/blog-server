const express = require('express');

const UserController = require('./controllers/User');
const ArticleController = require('./controllers/Article');
const RatingController = require('./controllers/Rating');
const Authorization = require('./controllers/Authorization');
const ProfileController = require('./controllers/Profile');

const router = express.Router();

const routes = {
  user: '/users',
  article: '/articles',
  rating: '/article-ratings',
  login: '/login',
  logout: '/logout',
  profile: '/profile',
  comment: '/comments',
};

router.get(`${routes.user}/:id`, UserController.getUser);
router.post(routes.user, UserController.createUser);
router.patch(`${routes.user}/:id`, UserController.updateUser);

router.get(`${routes.article}/:id`, ArticleController.getUser);
router.post(routes.article, ArticleController.createUser);
router.patch(`${routes.article}/:id`, ArticleController.updateUser);

router.get(`${routes.rating}/:id`, RatingController.getRating);
router.post(routes.rating, RatingController.createUser);

router.post(routes.login, Authorization.login);
router.post(routes.logout, Authorization.logout);

router.get(`${routes.profile}/:id`, ProfileController.getProfile);
router.put(`${routes.profile}/:id`, ProfileController.updateProfile);

router.get();

module.exports = router;
