import Router from "express";
import payment from "../controller/an-invoice-for-payment-controller.js";
const router = new Router();

router.post("/payment", payment.createPayment);
router.get("/payment", payment.getPayment);
router.put("/payment", payment.changePayment);
router.delete("/payment", payment.paid);
router.delete("/payment/:id", payment.deletePayment);

export default router;
