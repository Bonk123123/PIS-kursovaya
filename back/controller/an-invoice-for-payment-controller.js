import db from "../db.js";
import dayjs from "dayjs";

class payment {
  async getPayment(req, res) {
    try {
      const payment = await db.query(
        "SELECT * FROM public.aninvoiceforpayment"
      );
      res.json(payment.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async createPayment(req, res) {
    try {
      const { buyer, name, quantity, price } = req.body;
      const payment = await db.query(
        "INSERT INTO public.aninvoiceforpayment (buyer, name, quantity, price, date) VALUES ($1, $2, $3, $4, $5)",
        [buyer, name, quantity, price, dayjs()]
      );
      res.json(payment.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async changePayment(req, res) {
    try {
      const { id, buyer, name, quantity, price } = req.body;
      const payment = await db.query(
        "UPDATE public.aninvoiceforpayment set buyer = $2, name = $3, quantity = $4, price = $5, date = $6 WHERE id = $1",
        [id, buyer, name, quantity, price, dayjs()]
      );
      res.json(payment.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async paid(req, res) {
    try {
      const { id, buyer, name, quantity, price } = req.body;
      const bank = await db.query(
        "INSERT INTO public.saleforbanktransfer (id, buyer, name, quantity, price, date) VALUES ($1, $2, $3, $4, $5, $6)",
        [id, buyer, name, quantity, price, dayjs()]
      );
      const payment = await db.query(
        "DELETE FROM public.aninvoiceforpayment WHERE id = $1",
        [id]
      );
      res.json(bank.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async deletePayment(req, res) {
    try {
      const { id } = req.params;
      const payment = await db.query(
        "DELETE FROM public.aninvoiceforpayment WHERE id = $1",
        [id]
      );
      res.json(payment.rows);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new payment();
