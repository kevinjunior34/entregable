import { getCategorias } from "../repositories/categoria.repository.js";

export const listarCategorias = async (req, res) => {
  const data = await getCategorias();
  res.json(data);
};