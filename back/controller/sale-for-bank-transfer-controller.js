import db from "../db.js";
import dayjs from "dayjs";

class bank {
  async getBank(req, res) {
    try {
      const bank = await db.query("SELECT * FROM public.saleforbanktransfer");
      res.json(bank.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async createBank(req, res) {
    try {
      const { buyer, name, quantity, price } = req.body;
      const bank = await db.query(
        "INSERT INTO public.saleforbanktransfer (buyer, name, quantity, price, date) VALUES ($1, $2, $3, $4, $5)",
        [buyer, name, quantity, price, dayjs()]
      );
      res.json(bank.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async changeBank(req, res) {
    try {
      const { id, buyer, name, quantity, price } = req.body;
      const bank = await db.query(
        "UPDATE public.saleforbanktransfer set buyer = $2, name = $3, quantity = $4, price = $5, date = $6 WHERE id = $1",
        [id, buyer, name, quantity, price, dayjs()]
      );
      res.json(bank.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async deleteBank(req, res) {
    try {
      const { id } = req.params;
      const bank = await db.query(
        "DELETE FROM public.saleforbanktransfer WHERE id = $1",
        [id]
      );
      res.json(bank.rows);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new bank();
