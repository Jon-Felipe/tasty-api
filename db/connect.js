const mongoose = require('mongoose');

const connectDB = (url) => {
  try {
    const conn = mongoose.connect(url);
    return conn;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
