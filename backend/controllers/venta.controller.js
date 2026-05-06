import { registrarVenta } from "../services/venta.service.js";

export const crearVenta = async (req, res) => {
  try {
    const result = await registrarVenta(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};