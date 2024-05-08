'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = { username: 'admin' };  // TEST user object
const token = jwt.sign(user, process.env.SECRET);
console.log("Generated JWT:", token);

const secretKey = process.env.SECRET;

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, secretKey);
      },
    },
  });

  model.beforeCreate(async (user) => {
    user.password = bcrypt.hash(user.password, 10);
  });

  // Basic AUTH: Validating strings (username, password) 
  
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({
      where: { username }
    });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return user;
      }
    }
    throw new Error('Invalid User');
  };


  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({ username: parsedToken.username });
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userSchema;
