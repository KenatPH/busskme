/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre clubes (CRUD)
  Fecha creación  : 17 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteLinea, getDataLineas, getLinea } from "../controllers/linea.controller";

const router = Router();

router.post('/create',  create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteLinea);
router.get('/show', getDataLineas);
router.get('/show/:id', getLinea);


export default router;