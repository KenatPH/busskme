/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre colores de vehículos (CRUD)
  Fecha creación  : 29 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteColor, getColores, getColor, activarColor } from "../controllers/color.controller";
import {checkAuth} from '../config/config.jwt';

const router = Router();

router.post('/create', checkAuth,create);
router.put('/update/:id', checkAuth, update);
router.post('/active/:id', checkAuth, activarColor);
router.delete('/delete/:id', checkAuth, deleteColor);
router.get('/show', checkAuth, getColores);
router.get('/show/:id', checkAuth, getColor);



export default router;