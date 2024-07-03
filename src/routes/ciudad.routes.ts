/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre estados (CRUD)
  Fecha creación  : 26 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteCiudad, getDataCiudades, getCiudad, getCiudadesPaisEdo } from "../controllers/ciudad.controller";

const router = Router();

router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteCiudad);
router.get('/show', getDataCiudades); 
router.post('/show', getDataCiudades);
router.get('/show/:id', getCiudad);
router.get('/pais/estado/show', getCiudadesPaisEdo);
export default router;