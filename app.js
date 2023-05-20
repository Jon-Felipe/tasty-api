require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');
const recipesRouter = require('./routes/recipes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');

app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/recipes', recipesRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
