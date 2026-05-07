import { pool } from "../config/db.js";

export const getProductoById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM producto WHERE id_producto = $1",
    [id]
  );
  return rows[0];
};

export const updateStock = async (id, stock) => {
  await pool.query(
    "UPDATE producto SET stock = $1 WHERE id_producto = $2",
    [stock, id]
  );
};

export const getAllProductos = async () => {
  const { rows } = await pool.query("SELECT * FROM producto");
  return rows;
};

export const getProductosByCategoria = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM producto WHERE id_categoria = $1",
    [id]
  );
  return rows;
};