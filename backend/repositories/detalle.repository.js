import { pool } from "../config/db.js";

export const createDetalle = async (detalle) => {
  await pool.query(
    "INSERT INTO detalle_venta (cantidad, id_producto, id_venta) VALUES ($1, $2, $3)",
    [detalle.cantidad, detalle.idProducto, detalle.idVenta]
  );
};