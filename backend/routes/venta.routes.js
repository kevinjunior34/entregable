import { Router } from "express";
import { crearVenta } from "../controllers/venta.controller.js";

const router = Router();

router.post("/", crearVenta);

export default router;