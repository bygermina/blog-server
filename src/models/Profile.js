const { DataTypes } = require('sequelize');

const sequelize = require('../shared/config/db');
const User = require('./User');

const Profile = sequelize.define(
  'Profile',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    first: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // currency: {
    //   type: DataTypes.STRING, // TODO add currency table
    //   allowNull: true,
    // },
    // country: {
    //   type: DataTypes.STRING, // TODO add country table
    //   allowNull: true,
    // },
    // city: {
    //   type: DataTypes.STRING, // TODO add country table
    //   allowNull: true,
    // },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: 'username',
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

Profile.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Profile, { foreignKey: 'userId' });

module.exports = Profile;
