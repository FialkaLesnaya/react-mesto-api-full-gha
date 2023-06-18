const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors, celebrate } = require('celebrate');
require('dotenv').config();
const { errorMiddleware } = require('./middlewares/error');
const { authMiddleware } = require('./middlewares/auth');
const { validateUserBody, validateAuthentication } = require('./utils/validators');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1/mestodb' } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notFoundError');

const {
  createUser,
  login,
} = require('./controllers/users');

const app = express();

const corsOptions = {
  origin: ['https://listik-fialki.nomoredomains.rocks', 'http://listik-fialki.nomoredomains.rocks', 'http://localhost:3000', 'http://localhost:3000'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Apply the rate limiting middleware to all requests
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({ body: validateAuthentication }), login);
app.post('/signup', celebrate({ body: validateUserBody }), createUser);
app.use(authMiddleware);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((_, __, next) => next(new NotFoundError('Недействительный путь')));
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
