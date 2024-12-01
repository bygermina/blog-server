const { DataTypes } = require('sequelize');

const sequelize = require('../shared/config/db');

const Article = sequelize.define(
  'Article',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    blocks: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Article;
