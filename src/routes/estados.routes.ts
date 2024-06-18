/*
  Empresa         : Bioonix
  Aplicación      : Api de Dominó
  Módulo          : Archivo para definir las rutas de acciones sobre estados (CRUD)
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Dominó
*/

import { Router } from "express";
import { create, update, deleteEstado, getDataEdos, getEstado, getEstadosPais } from "../controllers/estado.controller";

const router = Router();

router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteEstado);
router.get('/show', getDataEdos);
router.get('/show/:id', getEstado);
router.get('/pais/show:paisid', getEstadosPais);
export default router;