/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre organizació (CRUD)
  Fecha creación  : 17 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteLinea, getDataLineas, getLinea , activarLinea} from "../controllers/organizacion.controller";
import {checkAuth} from '../config/config.jwt';
import config from '../config/config';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware';
import { register } from "../controllers/user.controller";

const multer = new MulterMiddleware(config.STORAGEAPI.imgsorganizacion,'organizacion');

const upload = multer.getMiddlewareArch().fields([{ name: 'img_rif', maxCount: 1 }, 
{ name: 'img_cps', maxCount: 1 },
{ name: 'fotoperfil', maxCount: 1 },
{ name: 'img_acta_constitutiva', maxCount: 12 },
{ name: 'img_ult_acta_asamblea', maxCount: 12 },]);

const router = Router();

router.post('/create',  checkAuth, function(req,res,next){upload(req, res, (err) => {
   
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
router.post('/register', checkAuth, function(req,res,next){upload(req, res, (err) => {
   
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
 })}, register);
router.put('/update/:id',checkAuth, function(req,res,next){upload(req, res, (err) => {
   
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
router.delete('/delete/:id',checkAuth, deleteLinea);
router.post('/active/:id',checkAuth, activarLinea);
router.get('/show',checkAuth, getDataLineas);
router.get('/show/:id', checkAuth,getLinea);


export default router;