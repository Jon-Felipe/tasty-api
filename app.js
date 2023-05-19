require('dotenv').config();

const express = require('express');
const app = express();

// routers
const authRouter = require('./routes/auth');

app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
