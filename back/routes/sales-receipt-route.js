import Router from "express";
import receipt from "../controller/sales-receipt-controller.js";
const router = new Router();

router.post("/receipt", receipt.createReceipt);
router.get("/receipt", receipt.getReceipt);
router.put("/receipt", receipt.changeReceipt);
router.delete("/receipt/:id", receipt.deleteReceipt);

export default router;
