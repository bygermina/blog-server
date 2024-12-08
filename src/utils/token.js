const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = decodeToken;
