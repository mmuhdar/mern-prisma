const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Todo {
  static async getTodoByUser(req, res, next) {
    const { id, userName } = req.user;
    try {
      const data = await prisma.todo.findMany({
        where: { userId: id },
      });
      res.status(200).json({
        message: `Succes Get All Todo from ${userName}`,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createTodoByUser(req, res, next) {
    const { id } = req.user;
    const { description } = req.body;
    try {
      const data = await prisma.todo.create({
        data: {
          userId: id,
          description: description,
          status: 'incomplete',
        },
      });
      res.status(201).json({
        message: `Success create data`,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Todo;
