import ProductModel from "../models/Product.js";
import { processSuccess, processFailure } from "./UtilsController.js";

export default {

  createProduct: (req, res) => {
    // would need to add checking and validation before running on sql
    const { body } = req
    ProductModel.createProduct(body)
      .then((product) => processSuccess(res, product))
      .catch((err) => processFailure(res, err))
  },

  findProductById: (req, res) => {
    const { id } = req.params
    ProductModel.findProductById(id)
      .then((product) => processSuccess(res, product))
      .catch((err) => processFailure(res, err))
  },

  getProductPriceById: (id) => {
    return ProductModel.findProductById(id)
      .then((product) => {
        if (!product?.dataValues?.price) {
          return null
        }
        return product.dataValues.price
      })
      .catch((err) => {return err})
  },

  getAllProducts: (req, res) => {
    ProductModel.findAllProducts({})
      .then((products) => processSuccess(res, products))
      .catch((err) => processFailure(res, err))
  }
}