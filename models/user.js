'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    generateJwtToken( expiresIn = '1h') {
      return jwt.sign({email: this.email}, process.env.SECRET_KEY, { expiresIn });
    }
    async validPassword(password) {
      
      return await bcrypt.compare(password, this.password);
    }
    static associate(models) {
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};