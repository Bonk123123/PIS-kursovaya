import db from "../db.js";
import dayjs from "dayjs";

class receipt {
  async getReceipt(req, res) {
    try {
      const receipt = await db.query("SELECT * FROM public.salesreceipt");
      res.json(receipt.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async createReceipt(req, res) {
    try {
      const { departmentnumber, name, quantity, price } = req.body;
      const receipt = await db.query(
        "INSERT INTO public.salesreceipt (departmentnumber, name, quantity, price, date) VALUES ($1, $2, $3, $4, $5)",
        [departmentnumber, name, quantity, price, dayjs()]
      );
      res.json(receipt.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async changeReceipt(req, res) {
    try {
      const { id, departmentnumber, name, quantity, price } = req.body;
      const receipt = await db.query(
        "UPDATE public.salesreceipt set departmentnumber = $2, name = $3, quantity = $4, price = $5, date = $6 WHERE id = $1",
        [id, departmentnumber, name, quantity, price, dayjs()]
      );
      res.json(receipt.rows);
    } catch (error) {
      res.json(error);
    }
  }
  async deleteReceipt(req, res) {
    try {
      const { id } = req.params;
      const receipt = await db.query(
        "DELETE FROM public.salesreceipt WHERE id = $1",
        [id]
      );
      res.json(receipt.rows);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new receipt();
