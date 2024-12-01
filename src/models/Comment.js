const { DataTypes } = require('sequelize');

const sequelize = require('../shared/config/db');

const Comment = sequelize.define(
  'Comment',
  {
    articleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Comment;
