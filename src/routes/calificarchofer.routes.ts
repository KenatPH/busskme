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
import { create, update, deleteCalificarChofer, getDataCalificarChoferes, getDataCalificarChofer, getCalificarChoferByUserId, getCalificarChoferByChoferId, getCalificacionTotalChofer } from "../controllers/calificarchofer.controller";
import {checkAuth} from '../config/config.jwt';
import config from '../config/config';


const router = Router();

router.post('/create',checkAuth, create);

router.put('/update/:id', checkAuth,update);
 
router.delete('/delete/:id', checkAuth, deleteCalificarChofer);
router.get('/show', getDataCalificarChoferes);
router.get('/show/:id', getCalificacionTotalChofer);
router.get('/show/chofer/:id', getCalificarChoferByChoferId);
router.get('/show/user/:id', getCalificarChoferByUserId);


export default router;

