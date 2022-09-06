const { PrismaClient } = require('@prisma/client');

const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

const prisma = new PrismaClient();

class Auth {
  static async register(req, res) {
    const { userName, password } = req.body;
    try {
      const data = await prisma.user.create({
        data: {
          userName: userName,
          password: hashPassword(password),
        },
      });
      res.status(201).json({
        message: 'Success create user',
        data: {
          id: data.id,
          userName: data.userName,
        },
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  }

  static async login(req, res) {
    const { userName, password } = req.body;
    try {
      const findData = await prisma.user.findUnique({
        where: { userName: userName },
      });
      if (findData) {
        const checkPassword = comparePassword(password, findData.password);
        const payload = {
          id: findData.id,
          userName: findData.userName,
        };

        if (checkPassword) {
          const token = createToken(payload);
          res.status(200).json({
            token: token,
          });
        } else {
          throw 'username/password are invalid';
        }
      } else {
        throw 'username/password are invalid';
      }
    } catch (err) {
      res.status(401).json({
        message: err,
      });
    }
  }
}

module.exports = Auth;
