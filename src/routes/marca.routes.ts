/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre categorías (CRUD)
  Fecha creación  : 25 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteMarca, getDataMarcas, getMarca, activarMarca } from "../controllers/marca.controller";
//import { validateCreate } from '../validators/categoria.validator';
import {checkAuth} from '../config/config.jwt';

const router = Router();

router.post('/create', checkAuth,create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteMarca);
router.delete('/active/:id', checkAuth, activarMarca);
router.get('/show', getDataMarcas);
router.get('/show/:id', getMarca);


export default router;