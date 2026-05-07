import { pool } from "../config/db.js";

export const validarCliente = async (cliente) => {
  const { rows } = await pool.query(
    `SELECT * FROM clientes 
     WHERE nombres = $1 
     AND apellidos = $2
     AND direccion = $3 
     AND telefono = $4`,
    [cliente.nombres, cliente.apellidos, cliente.direccion, cliente.telefono]
  );
  return rows.length > 0;
};