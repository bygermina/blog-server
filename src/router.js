const express = require('express');

const { authenticate, authorize } = require('./middleware/auth');
const UserController = require('./controllers/User');
const ArticleController = require('./controllers/Article');
//const RatingController = require('./controllers/Rating');
const Authorization = require('./controllers/Authorization');
const ProfileController = require('./controllers/Profile');
const ImageController = require('./controllers/Image');

const router = express.Router();

const routes = {
  userInfo: '/user-info',
  user: '/users',
  article: '/articles',
  rating: '/article-ratings',
  login: '/login',
  register: '/register',
  profile: '/profile',
  comment: '/comments',
  image: '/images',
};

router.post(routes.login, Authorization.login);
router.post(routes.register, Authorization.register);
//router.post(routes.logout, Authorization.logout);

router.get(`${routes.profile}/:username`, ProfileController.getProfile);
router.put(`${routes.profile}/:username`, ProfileController.updateProfile);

router.get(`${routes.user}/:id`, UserController.getUser);
router.post(routes.user, UserController.createUser);
router.patch(`${routes.user}/:id`, UserController.updateUser);
router.get(routes.userInfo, authenticate, UserController.getUserDataByToken);

router.get(routes.article, ArticleController.getArticles);
router.get(`${routes.article}/:id`, ArticleController.getArticle);
router.post(
  routes.article,
  authenticate,
  authorize(['admin']),
  ArticleController.createArticle,
);
router.patch(`${routes.article}/:id`, ArticleController.updateArticle);

router.get(`${routes.image}/:imagename`, ImageController.getImage);
router.post(
  `${routes.image}/:imagename`,
  ImageController.uploadImage,
  ImageController.createImage,
);
//router.put(`${routes.image}/:imagename`, ImageController.createImage);

// router.get(`${routes.rating}/:id`, RatingController.getRating);
// router.post(routes.rating, RatingController.createRating);

module.exports = router;
