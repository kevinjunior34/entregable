import express from "express";
import { validarClienteController } from "../controllers/cliente.controller.js";

const router = express.Router();

router.post("/validar", validarClienteController);

export default router;