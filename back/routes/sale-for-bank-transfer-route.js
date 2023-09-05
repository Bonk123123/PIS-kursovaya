import Router from "express";
import bank from "../controller/sale-for-bank-transfer-controller.js";
const router = new Router();

router.post("/bank", bank.createBank);
router.get("/bank", bank.getBank);
router.put("/bank", bank.changeBank);
router.delete("/bank/:id", bank.deleteBank);

export default router;
