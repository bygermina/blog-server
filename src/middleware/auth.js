const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const unauthorized_error = 'Пользователь не авторизован';

exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: unauthorized });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: unauthorized_error + 1 });
    }

    req.userId = decoded.id;
    req.userRoles = decoded.roles;

    next();
  });
};

exports.authorize = (roles) => {
  return (req, res, next) => {
    if (!req.userRoles.some((role) => roles.includes(role))) {
      return res.status(403).json({ error: unauthorized_error + 2 });
    }

    next();
  };
};
