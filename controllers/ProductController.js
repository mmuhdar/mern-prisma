const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class Products {
  static async getProducts(req, res) {
    try {
      const respon = await prisma.product.findMany();
      return res.status(200).json(respon);
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  }
  static async getProductById(req, res) {
    const { id } = req.params;
    try {
      const data = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
      if (data) {
        res.status(200).json({
          message: `Success get data with id ${id}`,
          data: data,
        });
      } else {
        throw `No Data with ID ${id}`;
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        message: err,
      });
    }
  }
  static async createProduct(req, res) {
    try {
      const { name, price } = req.body;
      const respon = await prisma.product.create({
        data: {
          name: name,
          price: Number(price),
        },
      });
      res.status(201).json({
        message: 'Success create data',
        data: respon,
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
  static async updateProduct(req, res) {
    const { id } = req.params;
    const { name, price } = req.body;
    const date = new Date();
    try {
      const findData = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
      if (findData) {
        const newPrice = price ? price : findData.price;
        const newName = name ? name : findData.name;

        const data = await prisma.product.update({
          where: { id: Number(id) },
          data: {
            ...findData,
            name: newName,
            price: Number(newPrice),
            updatedAt: date,
          },
        });
        res.status(200).json({
          message: `Success update data with ID ${id}`,
          data: data,
        });
      } else {
        throw `No Data found with ID ${id}`;
      }
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
  }
  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const data = await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });
      if (data) {
        res.status(200).json({
          message: `Succes Delete data with ID ${id}`,
        });
      } else {
        throw `No Data found with ID ${id}`;
      }
    } catch (err) {
      res.status(404).json({
        message: err,
      });
    }
  }
}

module.exports = Products;
