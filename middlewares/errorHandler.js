const {Prisma} = require('@prisma/client');

const errorHandler = (err, req, res, next) => {
console.log(err);
  let name = err.name;
  let code = err.code;
  let message = err.message;

  switch (name) {
    case 'JsonWebTokenError':
      message = 'Invalid Token';
      code = 401;
      break;
    case 'InvalidToken"':
      message = 'Please Login first !';
      code = 401;
      break;

    default:
      message = err;
      code = 500;
  }
  return res.status(code).json({ message });
};

module.exports = errorHandler;
