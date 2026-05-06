import { Router } from "express";
import {
  listarProductos,
  productosPorCategoria,
} from "../controllers/producto.controller.js";

const router = Router();

router.get("/", listarProductos);
router.get("/categoria/:id", productosPorCategoria);

export default router;