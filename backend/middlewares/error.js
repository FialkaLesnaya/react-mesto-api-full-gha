const {
  DEFAULT_ERROR_CODE,
  NOT_CORRECT_VALUE_ERROR_CODE,
  AUTH_ERROR_CODE,
  NO_ACCESS_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  IS_EXIST_ERROR_CODE,
} = require('../utils/utils');

module.exports.errorMiddleware = (err, _, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (err.name === 'ValidationError' || err.name === 'CastError' || err.statusCode === NOT_CORRECT_VALUE_ERROR_CODE) {
    return res.status(NOT_CORRECT_VALUE_ERROR_CODE).send({ message: err.message || 'Ошибка валидации данных' });
  }

  if (err.statusCode === AUTH_ERROR_CODE) {
    return res.status(err.statusCode).send({ message: err.message || 'Проблемы при авторизации/регистрации' });
  }

  if (err.statusCode === IS_EXIST_ERROR_CODE) {
    return res.status(err.statusCode).send({ message: err.message || 'По указанным данным уже существует пользователь' });
  }

  if (err.statusCode === NO_ACCESS_ERROR_CODE) {
    return res.status(err.statusCode).send({ message: err.message || 'Нет доступа' });
  }

  if (err.statusCode === NOT_FOUND_ERROR_CODE) {
    return res.status(err.statusCode).send({ message: err.message || 'Не найдено' });
  }

  return res.status(DEFAULT_ERROR_CODE).send({ message: err.message || 'Внутренняя ошибка сервера' });
};
