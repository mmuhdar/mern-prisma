const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../helpers/jwt');

const prisma = new PrismaClient();

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const { id } = verifyToken(access_token);
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw {
        name: 'InvalidToken',
      };
    } else {
      req.user = {
        id: user.id,
        userName: user.userName,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
