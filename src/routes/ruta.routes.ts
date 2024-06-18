/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre paises (CRUD)
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteRuta, getDataRutas, getRuta, activarRuta } from "../controllers/ruta.controller";
import passport from 'passport';
import { validateCreate } from '../validators/ruta.validator';
import {checkAuth} from '../config/config.jwt';

const router = Router();

router.post('/create', checkAuth, validateCreate, create);
router.put('/update/:id',checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteRuta);
router.post('/active/:id', checkAuth, activarRuta);
router.get('/show', getDataRutas);
router.get('/show/:id', getRuta);


export default router;