import { pool } from "../config/db.js";

export const validarCliente = async (cliente) => {
  const [rows] = await pool.query(
    `SELECT * FROM clientes 
     WHERE nombres = ? 
     AND apellidos = ?
     AND direccion = ? 
     AND telefono = ?`,
    [cliente.nombres, cliente.apellidos, cliente.direccion, cliente.telefono]
  );

  return rows.length > 0;
};