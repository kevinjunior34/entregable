import express from "express";
import cors from "cors";

import productoRoutes from "./routes/producto.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/clientes", clienteRoutes);
app.use("/productos", productoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/ventas", ventaRoutes);

app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080");
});