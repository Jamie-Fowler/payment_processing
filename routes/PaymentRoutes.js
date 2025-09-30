import PaymentController from "../controllers/PaymentController.js";
import { Router } from "express";

const router = Router() // 
router.get("/get/all", PaymentController.getAllPayments);
router.get("/get/status/:status", PaymentController.getByStatus);
router.get("/get/totalCompleted", PaymentController.getTotalCompleted);

// processing payments
router.post("/initialise", PaymentController.createPayment);
router.put("/setUser", PaymentController.setUser);
router.put("/processPayment", PaymentController.processPayment);

export default router;