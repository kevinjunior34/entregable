import express from "express";
import cors from "cors";

import productoRoutes from "./routes/producto.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 RUTA BASE (evita "Cannot GET /")
app.get("/", (req, res) => {
  res.json({
    mensaje: "API funcionando 🚀",
    rutas: [
      "/clientes",
      "/productos",
      "/categorias",
      "/ventas"
    ]
  });
});

// 🔹 RUTAS
app.use("/clientes", clienteRoutes);
app.use("/productos", productoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/ventas", ventaRoutes);

// 🔹 PUERTO PARA LOCAL Y PRODUCCIÓN
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});