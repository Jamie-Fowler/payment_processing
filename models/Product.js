import { DataTypes } from "sequelize";

let Product;

export const initialise = (sequelize) => {
  Product = sequelize.define(
    "Product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        // Allowing null for unpriced items
        type: DataTypes.INTEGER, // pence
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      indexes: [
        { fields: ["product_id"] },
        { fields: ["name"] },
      ],
    }
  );

  return Product;
};

export const createProduct = (product) => {
  if (!Product) throw new Error("Product model not initialised");
  return Product.create(product);
};

export const findProductById = (id) => {
  if (!Product) throw new Error("Product model not initialised");
  return Product.findByPk(id);
};

export const findAllProducts = (query = {}) => {
  if (!Product) throw new Error("Product model not initialised");
  return Product.findAll({ where: query });
};

export default {
  initialise,
  createProduct,
  findProductById,
  findAllProducts,
};
