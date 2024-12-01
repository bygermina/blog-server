const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const unauthorized_error = 'Пользователь не авторизован';

exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: unauthorized });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: unauthorized_error });
    }

    req.userId = decoded.id;
    req.userRoles = decoded.roles;

    next();
  });
};

exports.authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRoles)) {
      return res.status(403).json({ error: unauthorized_error });
    }

    next();
  };
};
