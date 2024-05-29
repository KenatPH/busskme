/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para definir las rutas de acciones sobre categorías (CRUD)
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import { Router } from "express";
import { create, update, deleteCategoria, getDataCategorias, getCategoria } from "../controllers/categoria.controller";
import { validateCreate } from '../validators/categoria.validator';

const router = Router();

router.post('/create', validateCreate, create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteCategoria);
router.get('/show', getDataCategorias);
router.get('/show/:id', getCategoria);


export default router;