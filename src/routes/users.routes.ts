/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre usuarios (CRUD)
  Fecha creación  : 27 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router, Request, Response, response } from "express";
import { register, update, deleteUser, uploadimg, registeradmin, activarUser, getUserRole, getUsers } from "../controllers/user.controller";
import { validateCreate } from '../validators/user.validator';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware';
import config from '../config/config';
import {checkAuth} from '../config/config.jwt';
const router = Router();
const multer = new MulterMiddleware(config.STORAGEAPI.fotop,'user');
const upload = multer.getMiddleware().single('fotoperfil');


router.post('/register', function(req,res,next){upload(req, res, (err) => {
   
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
 })},register);

 router.post('/admin/register',checkAuth, function(req,res,next){upload(req, res, (err) => {
   
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
 })},registeradmin);

router.post('/upload-imgs', function(req,res,next){upload(req, res, (err) => {   
   if (err) {      
      return res.status(409).json({
         data_send: "",         
         num_status:409,
         msg_status: err.message+req.file         
      }); 
   } else if (err) {
      return res.status(500).json({
         data_send: "",         
         num_status:500,
         msg_status: err.message         
      }); 
   }  
   next();      
 })},uploadimg);
router.put('/update/:id',checkAuth, update);
router.delete('/delete/:id',checkAuth,deleteUser);
router.post('/active/:id',checkAuth,activarUser);
router.get('/show/role/:rol',checkAuth,getUserRole);
router.get('/show',checkAuth,getUsers);


export default router;