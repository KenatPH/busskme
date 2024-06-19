/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre métodos de pago (CRUD)
  Fecha creación  : 18 de Jun del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteMetodopago, getDataMetodoPagos, getMetodoPagoById, getMetodoPagoByPais, activarMetodoPago } from "../controllers/metodopago.controller";
import {checkAuth} from '../config/config.jwt';

const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteMetodopago);
router.post('/active/:id', checkAuth, activarMetodoPago);
router.get('/show', getDataMetodoPagos);
router.get('/show/:id', getMetodoPagoById);
router.get('/pais/show/:paisid', getMetodoPagoByPais); 
export default router;