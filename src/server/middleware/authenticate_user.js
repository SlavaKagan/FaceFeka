const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const { secret } = require('../utils/constants');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '').trim();
    const decoded = jwt.verify(token, secret);
    const _id = decoded._id;
    const user = await User.findOne({ _id, token });

    if (!user) {
      throw new Error();
    }

    req.userFromAuth = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "You're not authenticated!" });
  }
};

module.exports = authenticateUser;