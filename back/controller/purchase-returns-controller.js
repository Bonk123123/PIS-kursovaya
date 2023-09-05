import db from "../db.js";
import dayjs from "dayjs";

class returns {
  async getReturns(req, res) {
    try {
      const returns = await db.query("SELECT * FROM public.purchasereturns");
      res.json(returns.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async createReturns(req, res) {
    try {
      const { saleid, buyer, reasonforreturn, name, quantity, price } =
        req.body;
      const returns = await db.query(
        "INSERT INTO public.purchasereturns (buyer, reasonforreturn, name, quantity, date, saleid, price) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [buyer, reasonforreturn, name, quantity, dayjs(), saleid, price]
      );
      res.json(returns.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async changeReturns(req, res) {
    try {
      const { id, buyer, reasonforreturn, name, quantity, price } = req.body;
      const returns = await db.query(
        "UPDATE public.purchasereturns set buyer = $2, reasonforreturn = $3, name = $4, quantity = $5, date = $6, price = $7 WHERE id = $1",
        [id, buyer, reasonforreturn, name, quantity, dayjs(), price]
      );
      res.json(returns.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async deleteReturns(req, res) {
    try {
      const { id } = req.params;
      const returns = await db.query(
        "DELETE FROM public.purchasereturns WHERE id = $1",
        [id]
      );
      res.json(returns.rows);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new returns();
