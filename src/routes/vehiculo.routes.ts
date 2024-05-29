/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre vehiculos (CRUD)
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteVehiculo, getDataVehiculos, getVehiculo } from "../controllers/vehiculo.controller";
import passport from 'passport';
import {checkAuth} from '../config/config.jwt';
import config from '../config/config';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware';

const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id',checkAuth, deleteVehiculo);
router.get('/show', getDataVehiculos);
router.get('/show/:id', getVehiculo);


export default router;