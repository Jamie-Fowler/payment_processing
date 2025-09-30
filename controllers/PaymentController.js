import PaymentModel from "../models/Payment.js";
import ProductController from "../controllers/ProductController.js";
import { processSuccess, processFailure } from "./UtilsController.js";
import { PaymentStatus } from "../controllers/UtilsController.js"
import { STRING } from "sequelize";

export default {

  createPayment: async (req, res) => {
    const { body } = req

    // Cleaning up input info and calculating price from product_id
    if (body.payment_id) {
      delete body.payment_id
    }
    if (!body.quantity || !Number.isInteger(body.quantity) || body.quantity < 1) {
      processFailure(res, {message: `No or invalid quantity given`})
    }
    if (!body.product_id) {
      processFailure(res, {message: `No product_id given`})
    } else {
      const productPrice = await ProductController.getProductPriceById(body.product_id)
      if (!productPrice) {
        processFailure(res, {message: `product_id does not match existing products`})
      } else if (productPrice.message) { // means failed during database retrieval
        processFailure(res, product)
      } else {
        body.total = body.quantity * productPrice
        body.currency = "GDP"
      }
    }
    if (body.status) {
      delete body.status
    }
    if (body.user_id) {
      body.user_id = null
    }

    // look into returning less than full object maybve just id
    PaymentModel.createPayment(body) 
      .then((payment) => processSuccess(res, payment))
      .catch((err) => processFailure(res, err))
  },

  // Should take out shared part into seperate method taking body and paymentStatus
  setUser: async (req, res) => {
    const { body } = req

    if (body.payment_id || Number.isInteger(body.payment_id) || body.payment_id > 0) {
      const payment = await PaymentModel.findPayment({payment_id: body.payment_id})
      if (payment) {
        if (payment.status == PaymentStatus.INITIALISED) {
          if (body.user_id && Number.isInteger(body.user_id)) {
            // would check if valid on other table
            PaymentModel.updatePayment(
              {user_id: body.user_id, status: PaymentStatus.USER_SET}, // columns to update
              {payment_id: payment.payment_id} // where clause
            )
              .then((payment) => processSuccess(res, payment))
              .catch((err) => processFailure(res, err))
          } else {
            processFailure(res, {message: "Invalid user_id/ can't find user"})
          }
        } else {
          processFailure(res, {message: "Payment in wrong stage"})
        }
      } else {
        processFailure(res, {message: "Cannot find existing payment"})
      }
    } else {
      processFailure(res, {message: "invalid payment_id"})
    }
  },

  processPayment: async (req, res) => {
    const { body } = req

    if (body.payment_id || Number.isInteger(body.payment_id) || body.payment_id > 0) {
      let payment = await PaymentModel.findPayment({payment_id: body.payment_id})
      if (payment) {
        let payment_id = payment.payment_id
        if (payment.status == PaymentStatus.USER_SET) {
          if (body.payment_method) {
            // would check if valid on other table
            await PaymentModel.updatePayment(
              {payment_method: body.payment_method, status: PaymentStatus.PAYMENT_PROCESSING}, // columns to update
              {payment_id: payment_id} // where clause
            ).catch((err) => processFailure(res, err))

            try { // stops payment being left on processing step
              if (Math.random() > 0.20) { // mock payment succeed
                // add stock level changing here to conform it has changed
                PaymentModel.updatePayment(
                  {status: PaymentStatus.COMPLETED},
                  {payment_id: payment_id}
                )
                  .then((payment) => processSuccess(res, payment))
                  .catch((err) => processFailure(res, err))
              } 
              else { // mock payment fail
                throw Error
              }
            } catch (err) {
              PaymentModel.updatePayment(
                  {status: PaymentStatus.FAILED},
                  {payment_id: payment_id}
                )
                  .then((payment) => processSuccess(res, payment))
                  .catch((err) => processFailure(res, err))
            }
          } else {
            processFailure(res, {message: "Invalid payment_method"})
          }
        } else {
          processFailure(res, {message: "Payment in wrong stage"})
        }
      } else {
        processFailure(res, {message: "Cannot find existing payment"})
      }
    } else {
      processFailure(res, {message: "invalid payment_id"})
    }
  },

  getAllPayments: (req, res) => {
    PaymentModel.findAllPayments({})
      .then((payments) => processSuccess(res, payments))
      .catch((err) => processFailure(res, err))
  },

  getByStatus: (req, res) => {
    const { status } = req.params
    if (Object.values(PaymentStatus).includes(status)) {
      PaymentModel.findAllPayments({"status": status})
        .then((payments) => processSuccess(res, payments))
        .catch((err) => processFailure(res, err))
    } else {
      processFailure(res, {message: `Invalid Status given: ${status}`})
    }
  },

  getTotalCompleted: (req, res) => {
    PaymentModel.getTotalCompleted()
      .then((payments) => processSuccess(res, payments))
      .catch((err) => processFailure(res, err))
  }
}