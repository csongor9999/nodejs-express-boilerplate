const User = require('../models').user;
const utils = require('../lib/utils');
const { StatusCodes } = require('http-status-codes');

exports.login = async (req, res, next) => {
  const rawUser = await User.findOne({ where: { username: req.body.username } });
  const user = rawUser ? rawUser.dataValues : null;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ success: false, msg: "Could not find user" });
  }

  const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

  if (isValid) {
    const tokenObject = utils.issueJWT(user);
    res.json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires })
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ success: false, msg: "You entered a wrong password" });
  }
}

exports.register = async (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password)
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const findUser = await User.findOne({ where: { username: req.body.username } });

  if (findUser) {
    res.status(StatusCodes.CONFLICT).json({ success: false, msg: "User already exists" });
  } else {
    const newUser = await User.create({
      username: req.body.username,
      salt: salt,
      hash: hash,
      email: req.body.email,
      role: utils.ROLE.USER
    });

    const user = newUser.dataValues;

    const jwt = utils.issueJWT(user);

    res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires })

  }


}

exports.profile = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "You are authorized" });
}