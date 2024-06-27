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
import { create, update, deleteVehiculo, getDataVehiculos, getVehiculo, activarVehiculo, getDataVehiculosbyDriver } from "../controllers/vehiculo.controller";
import passport from 'passport';
import {checkAuth} from '../config/config.jwt';
import config from '../config/config';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware';


const multer = new MulterMiddleware(config.STORAGEAPI.imgsvehiculo,'vehiculo');

const upload = multer.getMiddleware().fields([{ name: 'img_certificado', maxCount: 1 }, 
{ name: 'img_poliza', maxCount: 1 }]);

const router = Router();

router.post('/create', checkAuth,function(req,res,next){upload(req, res, (err) => {
   
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
router.put('/update/:id', checkAuth,function(req,res,next){upload(req, res, (err) => {
   
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
 })}, update);
router.delete('/delete/:id',checkAuth, deleteVehiculo);
router.post('/active/:id',checkAuth, activarVehiculo);
router.get('/show', getDataVehiculos);
router.get('/show/:id', getVehiculo);

router.get('/show/byDriver/:id', getDataVehiculosbyDriver);


export default router;