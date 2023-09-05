import Router from "express";
import returns from "../controller/purchase-returns-controller.js";
const router = new Router();

router.post("/returns", returns.createReturns);
router.get("/returns", returns.getReturns);
router.put("/returns", returns.changeReturns);
router.delete("/returns/:id", returns.deleteReturns);

export default router;
