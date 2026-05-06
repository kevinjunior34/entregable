import { pool } from "../config/db.js";

export const createVenta = async (idCliente) => {
  const [result] = await pool.query(
    "INSERT INTO ventas (fecha, id_cliente) VALUES (NOW(), ?)",
    [idCliente]
  );
  return result.insertId;
};