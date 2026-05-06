import { Router } from "express";
import { listarCategorias } from "../controllers/categoria.controller.js";

const router = Router();

router.get("/", listarCategorias);

export default router;