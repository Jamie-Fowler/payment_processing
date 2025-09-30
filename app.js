import express from 'express';
import { processSuccess } from "./controllers/UtilsController.js";
import { Sequelize, Model, DataTypes } from 'sequelize';

// Import routing
import ProductRoutes from "./routes/ProductRoutes.js"
import PaymentRoutes from "./routes/PaymentRoutes.js"

// Importing Models
import ProductModel from "./models/Product.js"
import PaymentModel from "./models/Payment.js"

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Initialising the Model on sequelize
const productModel = ProductModel.initialise(sequelize);
PaymentModel.initialise(sequelize, productModel);

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

// Testing server response
app.get('/status', (request, response) => {
  const status = {
    "Status": "Running"
  }
  processSuccess(response, status)
})

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    app.use("/product", ProductRoutes)
    app.use("/payment", PaymentRoutes)

    app.listen(port, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });