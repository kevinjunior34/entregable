import { pool } from "../config/db.js";

export const createCliente = async (cliente) => {
  const { rows } = await pool.query(
    "INSERT INTO clientes (nombres, apellidos, direccion, telefono) VALUES ($1, $2, $3, $4) RETURNING id_cliente",
    [cliente.nombres, cliente.apellidos, cliente.direccion, cliente.telefono]
  );
  return rows[0].id_cliente;
};