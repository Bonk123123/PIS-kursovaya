import express from "express";
import cors from "cors";
import payment from "./routes/an-invoice-for-payment-route.js";
import returns from "./routes/purchase-returns-route.js";
import bank from "./routes/sale-for-bank-transfer-route.js";
import receipt from "./routes/sales-receipt-route.js";
import report from "./routes/report-route.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(payment);
app.use(returns);
app.use(bank);
app.use(receipt);
app.use(report);

app.listen(PORT, () => console.log("sasageyo"));
