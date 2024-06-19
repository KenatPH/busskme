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
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware'
import config from '../config/config';

const router = Router();
const multer = new MulterMiddleware(config.STORAGEAPI.imgmetodopago,"metodopago");
const upload = multer.getMiddleware().single('imagen');


router.post('/create', checkAuth, function(req,res,next){upload(req, res, (err) => {
   
  if (err) {
     return res.status(409).json({
        data_send: "",         
        num_status:409,
        msg_status: err.message         
     }); 
  } else if (err) {
     return res.status(500).json({
        data_send: "",         
        num_status:500,
        msg_status: err.message         
     }); 
  } 
  next();  
})}, create);
router.put('/update/:id', checkAuth, function(req,res,next){upload(req, res, (err) => {
   
  if (err) {
     return res.status(409).json({
        data_send: "",         
        num_status:409,
        msg_status: err.message         
     }); 
  } else if (err) {
     return res.status(500).json({
        data_send: "",         
        num_status:500,
        msg_status: err.message         
     }); 
  } 
  next();  
})},update);
router.delete('/delete/:id', checkAuth, deleteMetodopago);
router.post('/active/:id', checkAuth, activarMetodoPago);
router.get('/show', getDataMetodoPagos);
router.get('/show/:id', getMetodoPagoById);
router.get('/pais/show/:paisid', getMetodoPagoByPais); 
export default router;