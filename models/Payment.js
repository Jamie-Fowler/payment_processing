import { DataTypes } from "sequelize";
import ProductModel from "./Product.js"
import { PaymentStatus } from "../controllers/UtilsController.js"
// import User from "./User.js"

let Payment;

export const initialise = (sequelize, Product) => { // User
  Payment = sequelize.define(
    "Payment",
    {
      payment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Product,
          key: "product_id",
        },
      },
      quantity: { // number of items ordered
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: { // total price of items ordered
        type: DataTypes.INTEGER, // pence
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_method: { // add enum as well
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: Object.values(PaymentStatus), // may be wrong, would investgate more
        allowNull: false,
        defaultValue: "initialised",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: {
        //   model: User,
        //   key: "user_id",
        // },
      }
    },
    {
      indexes: [
        { fields: ["payment_id"] },
        { fields: ["total"] },
        { fields: ["status"] },
      ],
    }
  );

  Payment.belongsTo(Product, { foreignKey: "product_id" });
  // Payment.belongsTo(User, { foreignKey: "user_id" });

  return Payment;
};

export const createPayment = (product) => {
  if (!Payment) throw new Error("Payment model not initialised");
  return Payment.create(product);
};

export const updatePayment = (updates, query) => {
  // very unsafe as a method, could make super safe but would limit use
  // safety of use would come from calling methods
  if (!Payment) throw new Error("Payment model not initialised");
  return Payment.update(updates, { where: query });
}

export const findPayment = (query) => {
  if (!Payment) throw new Error("Payment model not initialised");
  return Payment.findOne({ where: query });
};

export const findAllPayments = (query = {}) => {
  if (!Payment) throw new Error("Payment model not initialised");
  return Payment.findAll({ where: query });
};

export const getTotalCompleted = () => {
  // add valid checker for sercurity
  if (!Payment) throw new Error("Payment model not initialised");
  return Payment.sum('total', { where: { status: [PaymentStatus.COMPLETED]}});
};

export default {
  initialise,
  createPayment,
  updatePayment,
  findPayment,
  findAllPayments,
  getTotalCompleted,
};
