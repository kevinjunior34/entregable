import { pool } from "../config/db.js";

export const getCategorias = async () => {
  const { rows } = await pool.query("SELECT * FROM categoria");
  return rows;
};