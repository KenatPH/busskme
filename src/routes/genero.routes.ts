/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para definir las rutas de acciones sobre género (CRUD)
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import { Router } from "express";
import { create, update, deleteGenero, getDataGeneros, getGenero } from "../controllers/genero.controller";
//import { validateCreate, validateUpdate } from '../validators/genero.validator';

const router = Router();

router.post('/create',  create);
router.put('/update/:id',  update);
router.delete('/delete/:id', deleteGenero);
router.get('/show', getDataGeneros);
router.get('/show/:id', getGenero);


export default router;