import {
  getAllProductos,
  getProductosByCategoria,
} from "../repositories/producto.repository.js";

export const listarProductos = async (req, res) => {
  try {
    const data = await getAllProductos();
    res.json(data);
  } catch (error) {
    console.error("Error en listarProductos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const productosPorCategoria = async (req, res) => {
  try {
    const data = await getProductosByCategoria(req.params.id);
    res.json(data);
  } catch (error) {
    console.error("Error en productosPorCategoria:", error);
    res.status(500).json({ error: "Error al obtener productos por categoría" });
  }
};