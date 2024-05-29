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
import { create, update, deleteEducacion, getDataEducacion, getEducacion, activarEducacion } from "../controllers/educacion.controller";
import {checkAuth} from '../config/config.jwt';

const router = Router();

router.post('/create', checkAuth,create);
router.put('/update/:id',checkAuth, update);
router.delete('/delete/:id', checkAuth,deleteEducacion);
router.delete('/active/:id', checkAuth,activarEducacion);
router.get('/show', getDataEducacion);
router.get('/show/:id', getEducacion);


export default router;