import ProductController from "../controllers/ProductController.js";
import { Router } from "express";

const router = Router()
router.post("/create", ProductController.createProduct);
router.get("/get/all", ProductController.getAllProducts);
router.get("/get/:id", ProductController.findProductById);

export default router;