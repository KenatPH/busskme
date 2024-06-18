/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre paradas (CRUD)
  Fecha creación  : 16 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteParada, activarParada, getDataParadas, getParada,getDataParadasByNombre, getDataParadasByRuta } from "../controllers/parada.controller";
//import { validateCreate } from '../validators/ruta.validator';

const router = Router();

router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteParada);
router.put('/active/:id', activarParada);
router.get('/show', getDataParadas);
router.get('/show/:filtro', getDataParadasByNombre);
router.get('/show/:id', getParada);
router.get('/ruta/show/:rutaid', getDataParadasByRuta);



export default router;