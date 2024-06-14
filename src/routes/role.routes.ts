/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre perfiles (CRUD)
  Fecha creación  : 17 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteRole, getDataRoles, getRole } from "../controllers/role.controller";
import {checkAuth} from '../config/config.jwt';
//import { validateCreate } from '../validators/role.validator';

const router = Router();

router.post('/create',checkAuth, create);
router.put('/update/:id',checkAuth, update);
router.delete('/delete/:id',checkAuth, deleteRole);
router.get('/show', getDataRoles);
router.get('/show/:id', getRole);


export default router;