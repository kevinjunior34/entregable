import {
  getProductoById,
  updateStock,
} from "../repositories/producto.repository.js";

import { createCliente } from "../repositories/cliente.repository.js";
import { createVenta } from "../repositories/venta.repository.js";
import { createDetalle } from "../repositories/detalle.repository.js";

export const registrarVenta = async (data) => {
  const { cliente, detalles } = data;

  if (!cliente) throw new Error("Cliente requerido");

  const idCliente = await createCliente(cliente);
  const idVenta = await createVenta(idCliente);

  let total = 0;

  for (const d of detalles) {
    const producto = await getProductoById(d.idProducto);

    if (!producto) throw new Error("Producto no existe");

    if (producto.stock < d.cantidad) {
      throw new Error(`Stock insuficiente: ${producto.descripcion}`);
    }

    // descontar stock
    const nuevoStock = producto.stock - d.cantidad;
    await updateStock(producto.id_producto, nuevoStock);

    await createDetalle({
      cantidad: d.cantidad,
      idProducto: producto.id_producto,
      idVenta,
    });

    total += producto.precio * d.cantidad;
  }

  return {
    idVenta,
    total,
  };
};