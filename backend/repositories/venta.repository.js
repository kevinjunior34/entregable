import { pool } from "../config/db.js";

export const createVenta = async (idCliente) => {
  const { rows } = await pool.query(
    "INSERT INTO ventas (fecha, id_cliente) VALUES (NOW(), $1) RETURNING id_venta",
    [idCliente]
  );
  return rows[0].id_venta;
};