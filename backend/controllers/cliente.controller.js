import { validarCliente } from "../services/cliente.service.js";

export const validarClienteController = async (req, res) => {
  try {
    const cliente = req.body;

    const existe = await validarCliente(cliente);

    if (!existe) {
      return res.status(404).json({
        ok: false,
        mensaje: "Cliente no registrado"
      });
    }

    res.json({ ok: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};