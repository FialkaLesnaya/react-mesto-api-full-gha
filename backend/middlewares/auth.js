const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;
const AuthError = require('../errors/authError');

module.exports.authMiddleware = (req, res, next) => {
  let token = req.headers.authorization || req.body.token || req.cookies.token;
  console.log('token', token);

  if (!token) {
    return next(new AuthError('Отсутствует токен'));
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    req.headers.authorization = token;
    req.user = payload;

    return next();
  } catch (error) {
    return next(new AuthError('Недействтельный токен'));
  }
};
