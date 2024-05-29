/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre modelos de vehículos (CRUD)
  Fecha creación  : 29 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteModeloVeh, getDataModelos, getModelo, getModeloByMarcaid } from "../controllers/modeloveh.controller";
//import { validateCreate } from '../validators/categoria.validator';
import {checkAuth} from '../config/config.jwt';

const router = Router();

router.post('/create', checkAuth,create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteModeloVeh);
router.get('/show', getDataModelos);
router.get('/show/:id', getModelo);
router.get('/marca/show/:id', getModeloByMarcaid);


export default router;