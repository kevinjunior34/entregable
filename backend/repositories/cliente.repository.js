import { pool } from "../config/db.js";

export const createCliente = async (cliente) => {
  const [result] = await pool.query(
    "INSERT INTO clientes (nombres, apellidos, direccion, telefono) VALUES (?, ?, ?, ?)",
    [
      cliente.nombres,
      cliente.apellidos,
      cliente.direccion,
      cliente.telefono,
    ]
  );
  return result.insertId;
};