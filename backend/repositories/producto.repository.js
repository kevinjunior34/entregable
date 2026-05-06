import { pool } from "../config/db.js";

// OBTENER PRODUCTO POR ID
export const getProductoById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM producto WHERE id_producto = ?",
    [id]
  );
  return rows[0];
};

// ACTUALIZAR STOCK
export const updateStock = async (id, stock) => {
  await pool.query(
    "UPDATE producto SET stock = ? WHERE id_producto = ?",
    [stock, id]
  );
};

// LISTAR TODOS
export const getAllProductos = async () => {
  const [rows] = await pool.query("SELECT * FROM producto");
  return rows;
};

// POR CATEGORÍA
export const getProductosByCategoria = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM producto WHERE id_categoria = ?",
    [id]
  );
  return rows;
};