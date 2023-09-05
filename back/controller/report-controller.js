import db from "../db.js";
import dayjs from "dayjs";

class report {
  async getReport(req, res) {
    try {
      const sorting = req.query.sorting;
      const direction = req.query.direction;

      const bank = await db.query("SELECT * FROM public.saleforbanktransfer");
      const returns = await db.query("SELECT * FROM public.purchasereturns");
      const receipt = await db.query("SELECT * FROM public.salesreceipt");

      // Вид продажи	Дата продажи	Сумма

      const reportBank = bank.rows.map((item) => {
        return {
          type: "Sale For Bank Transfer",
          date: item.date,
          sum: item.price * item.quantity,
        };
      });

      const reportReturns = returns.rows.map((item) => {
        return {
          type: "Purchase Returns",
          date: item.date,
          sum: item.price * item.quantity,
        };
      });

      const reportReceipt = receipt.rows.map((item) => {
        return {
          type: "Sales Receipts",
          date: item.date,
          sum: item.price * item.quantity,
        };
      });

      const report = reportBank.concat(reportReturns, reportReceipt);
      switch (sorting) {
        case "SaleForBankTransfer":
          res.json(reportBank);
          break;

        case "PurchaseReturns":
          res.json(reportReturns);
          break;

        case "SalesReceipts":
          res.json(reportReceipt);
          break;

        case "date":
          let sortedDate;
          let report1 = report.map((item) => {
            return { ...item, date: item.date.slice(1, -1) };
          });

          if (direction === "up") {
            sortedDate = report1.sort((a, b) => {
              let data1 = dayjs(a.date);
              let data2 = dayjs(b.date);
              if (data1.diff(data2, "second") > 0) {
                return 1;
              }
              if (data1.diff(data2, "second") < 0) {
                return -1;
              }
              return 0;
            });
          }

          if (direction === "down") {
            sortedDate = report1.sort((a, b) => {
              let data1 = dayjs(a.date);
              let data2 = dayjs(b.date);
              if (data1.diff(data2, "second") > 0) {
                return -1;
              }
              if (data1.diff(data2, "second") < 0) {
                return 1;
              }
              return 0;
            });
          }
          const sortedDate1 = sortedDate.map((item) => {
            return { ...item, date: `"${item.date}"` };
          });
          res.json(sortedDate1);
          break;

        case "sum":
          let sortedSum;

          if (direction == "up") {
            sortedSum = report.sort((a, b) => {
              if (a.sum > b.sum) {
                return 1;
              }
              if (a.sum < b.sum) {
                return -1;
              }
              return 0;
            });
          }

          if (direction == "down") {
            sortedSum = report.sort((a, b) => {
              if (a.sum > b.sum) {
                return -1;
              }
              if (a.sum < b.sum) {
                return 1;
              }
              return 0;
            });
          }
          res.json(sortedSum);
          break;

        default:
          res.json(report);
          break;
      }
    } catch (error) {
      res.json(error);
    }
  }
}

export default new report();
