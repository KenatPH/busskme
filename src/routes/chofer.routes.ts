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
import { create, update, register, deleteChofer, getDataChoferes, getChofer } from "../controllers/chofer.controller";
import {checkAuth} from '../config/config.jwt';
import config from '../config/config';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware';

const multer = new MulterMiddleware(config.STORAGEAPI.imgschofer,'chofer');

const upload = multer.getMiddleware().fields([{ name: 'fotoperfil', maxCount: 1 }, 
{ name: 'imagen_dni', maxCount: 1 },
{ name: 'imagen_licencia', maxCount: 1 },
{ name: 'imagen_cermed', maxCount: 1 },]);



const router = Router();

router.post('/create', function(req,res,next){upload(req, res, (err) => {
   
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
 })},create);

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
 
router.delete('/delete/:id', checkAuth, deleteChofer);
router.get('/show', getDataChoferes);
router.get('/show/:id', getChofer);


export default router;

