import Router from "express";
import report from "../controller/report-controller.js";
const router = new Router();

router.get("/report", report.getReport);

export default router;
