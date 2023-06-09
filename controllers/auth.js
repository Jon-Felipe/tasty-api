const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide an email and a password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { name, lastName, email } = req.body;
  if (!name || !lastName || !email) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findById({ _id: req.user.userId });

  user.name = name;
  user.lastName = lastName;
  user.email = email;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token,
    },
  });
};

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  await Recipe.deleteMany({ createdBy: userId });
  await User.findByIdAndDelete(userId);

  res.status(StatusCodes.OK).send();
};

module.exports = { register, login, updateUser, deleteUser };
