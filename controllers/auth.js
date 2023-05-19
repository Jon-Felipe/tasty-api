const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    });
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
