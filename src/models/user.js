'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('USER', 'PROVIDER', 'ADMIN')
  }, {});
  User.associate = function (models) { };
  return User;
};