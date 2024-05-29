/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de usuarios-choferes
  Fecha creación  : 27 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import User from "../models/users.models";
import Role from "../models/role.models";
import Chofer from "../models/chofer.models";
import {getToken, getTokenData} from "../config/config.jwt";
import {sendMail, getTemplateHtml} from "../config/config.mail";
import  utilsHandle  from "../utils/utilsHandle";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";
import fs from 'fs-extra';
import path from 'path';


export const getChofer = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id no es válido'
      });
   }
   const data = await Chofer.findById(id);
   
   try {
      if(!data){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Chofer no encontrado.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Chofer encontrado satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (chofer)'         
      });
   }   
}

export const getDataChoferes = async (req: Request, res: Response): Promise<Response> => {
   const data = await Chofer.find();
      
   try {
      if(data.length === 0){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Chofer no encontrado.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Chofer encontrado satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (chofer)'         
      });
   }   
}


export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const { dni, nombre, fecha_nacimiento, genero, correo, telefono, fotoperfil2,
      clave, direccion, roles, idioma, lugar_nacimiento, nro_rif, fecha_insc_rif,fecha_emision_rif,
      fecha_venc_rif, fecha_venc_dni, nro_licencia, fecha_emision_lic,
      fecha_venc_lic, grado_licencia, nro_cert_medico, fecha_emision_cermed,
      fecha_venc_cermed, grado_cermed, carga_familiar, grado_instruccion,
      idiomas} = req?.body
         
   var imgs = Object();          
   imgs = req.files;  
   if(imgs != undefined && imgs !== null && imgs){      
      var imagen_dni_path = imgs['imagen_dni'][0].path !== "" ? imgs['imagen_dni'][0].path : "";
      var imagen_licencia_path = imgs['imagen_licencia'][0].path !== "" ? imgs['imagen_licencia'][0].path : "";
      var imagen_cermed_path = imgs['imagen_cermed'][0].path !== "" ? imgs['imagen_cermed'][0].path : "";
      var fotoperfil_path = imgs['fotoperfil'][0].path !== "" ? imgs['fotoperfil'][0].path : "";
   }           
   const user = await User.findOne({correo: correo})
   if(user) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'Ya existe un usuario con este correo.'         
      });      
   }
   
   if(fotoperfil2 !== null && fotoperfil2 !== undefined && fotoperfil2 !== ""){
      const storagePath = path.resolve(fotoperfil2);      
      if (fs.existsSync(storagePath)) {
         await fs.unlink(storagePath);            
      }
   }
    
   const last = await User.findOne().sort({idcode: -1});
   const idcode = last ? last.idcode + 1 : 1; 
   const newUser = new User({
      idcode: idcode,      
      dni,
      nombre,
      fecha_nacimiento,
      genero,
      correo,
      telefono, 
      fotoperfil: fotoperfil_path,
      clave,  
      idioma,
      direccion            
      /* origen, 
      fbkid, 
      googleid,
      tokenFacebook,
      tokenGoogle */
   });
   
   if(roles.length > 0){
      const foundRoles = await Role.find({nombre: {$in: roles}});      
      if(!foundRoles){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'The submitted roles do not exist!'         
         })
      }      
      newUser.roles = foundRoles.map(role => role._id);
   }else{
      //si no viene información en roles, asignamos vacío
      newUser.roles = [];            
   }

   
   

   try {
      
      await newUser.save();
      const id = newUser._id;  
      const chofer = new Chofer({
         userid: id,
         lugar_nacimiento, 
         nro_rif, 
         fecha_insc_rif,
         fecha_emision_rif,
         fecha_venc_rif, 
         fecha_venc_dni, 
         imagen_dni : imagen_dni_path, 
         nro_licencia, 
         fecha_emision_lic,
         fecha_venc_lic, 
         grado_licencia, 
         imagen_licencia: imagen_licencia_path, 
         nro_cert_medico, 
         fecha_emision_cermed,
         fecha_venc_cermed, 
         grado_cermed, 
         imagen_cermed: imagen_cermed_path, 
         carga_familiar, 
         grado_instruccion,
         idiomas
      });
      await chofer.save();

      const token = getToken({ correo, id, idcode, nombre, telefono, idioma, roles},'2d');   
      const accion = "confirmar";
      const html = getTemplateHtml(nombre, token, idcode, accion, "", "");
      
      await sendMail(correo, 'Confirmar cuenta', html);
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: {            
            "Nombre y apellidos": newUser.nombre,
            "cédula": newUser.dni,
            "teléfono": newUser.telefono,
            "dirección": newUser.direccion, 
            "correo": newUser.correo,           
            "token": token
         },         
         num_status:httpCode[201].code,
         msg_status: httpCode[600].message_es
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (chofer-user) '         
      });
   }
}

export const register = async (req: Request, res: Response): Promise<Response> => {
   
   const { dni, nombre, fecha_nacimiento, genero, correo, telefono, fotoperfil2,
           clave, direccion, roles, lugar_nacimiento, nro_rif, fecha_insc_rif,fecha_emision_rif,
           fecha_venc_rif, fecha_venc_dni, imagen_dni, nro_licencia, fecha_emision_lic,
           fecha_venc_lic, grado_licencia, imagen_licencia, nro_cert_medico, fecha_emision_cermed,
           fecha_venc_cermed, grado_cermed, imagen_cermed, carga_familiar, grado_instruccion,
           idiomas } = req?.body
   console.log('sonia body: ',req.body);
   console.log('sonia files: ',req.files);
   const user = await User.findOne({correo: correo})
   if(user) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'The user already exists!'         
      });
   }
   
   var imgs = Object();       
   imgs = req.files; 
   if(imgs != undefined && imgs !== null && imgs){      
      var imagen_dni_path = imgs['imagen_dni'][0].path !== "" ? imgs['imagen_dni'][0].path : "";
      var imagen_licencia_path = imgs['imagen_licencia'][0].path !== "" ? imgs['imagen_licencia'][0].path : "";
      var imagen_cermed_path = imgs['imagen_cermed'][0].path !== "" ? imgs['imagen_cermed'][0].path : "";
      var fotoperfil_path = imgs['fotoperfil'][0].path !== "" ? imgs['fotoperfil'][0].path : "";
   }  
   console.log('imag rutas: ',imagen_dni_path,' ',imagen_cermed_path,' ',imagen_licencia_path+' ',fotoperfil_path);
   if(fotoperfil2 !== null && fotoperfil2 !== undefined && fotoperfil2 !== ""){
      const storagePath = path.resolve(fotoperfil2);      
      if (fs.existsSync(storagePath)) {
         await fs.unlink(storagePath);            
      }
   }

   const last = await User.findOne().sort({idcode: -1});
   const idcode = last ? last.idcode + 1 : 1; //generamos un idcode para el usuario   
   const newUser = new User({
      idcode: idcode,      
      dni,
      nombre,
      fecha_nacimiento,
      genero,
      correo,
      telefono, 
      fotoperfil: fotoperfil_path,
      direccion,
      clave,    
      /* origen, 
      fbkid, 
      googleid,
      tokenFacebook,
      tokenGoogle */
   });

   //verificamos que los roles enviados existan
   if(roles.length > 0){
      const foundRoles = await Role.find({nombre: {$in: roles}});      
      if(!foundRoles){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'The submitted roles do not exist!'         
         })
      }
      //si roles trae información tomamos el id del rol recibido y lo asignamos a roles
      newUser.roles = foundRoles.map(role => role._id);
   }else{
      //si no viene información en roles, asignamos vacío
      newUser.roles = [];      
   }

   try {
      
      await newUser.save();
      const id = newUser._id;   
      const chofer = new Chofer({
         userid: id,
         lugar_nacimiento, 
         nro_rif, 
         fecha_insc_rif,
         fecha_emision_rif,
         fecha_venc_rif, 
         fecha_venc_dni, 
         imagen_dni : imagen_dni_path, 
         nro_licencia, 
         fecha_emision_lic,
         fecha_venc_lic, 
         grado_licencia, 
         imagen_licencia: imagen_licencia_path, 
         nro_cert_medico, 
         fecha_emision_cermed,
         fecha_venc_cermed, 
         grado_cermed, 
         imagen_cermed: imagen_cermed_path, 
         carga_familiar, 
         grado_instruccion,
         idiomas
      });
      await chofer.save();      
      
      const token = getToken({ correo, id, idcode, telefono, roles},'2d');
         
      const accion = "confirmar";
      const html = getTemplateHtml(nombre, token, idcode, accion, "", "");
      
      await sendMail(correo, 'Confirmar cuenta', html);
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: {
            "afiliado": newUser.idcode,
            "nomre y apellido": newUser.nombre,
            "fecha nacimiento": newUser.fecha_nacimiento,
            "ubicación": newUser.direccion,
            "email": newUser.correo,
            "telefonos": newUser.telefono,            
            "token": token
         },         
         num_status:httpCode[201].code,
         msg_status: 'User created successfully, an email has been sent to confirm your account, check your spam folder.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'error (chofer) '+error         
      });
   }
}

export const update = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      const { nombre, direccion, telefono, genero, fecha_nacimiento, activo, 
         confirmado, fotoperfil2, roles } = req.body;

      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      }
      // Find the user by userId
      const user = await User.findById(id);

      if (!user) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'User not found'
         });
      }
      var img = Object();       
      img = req.file; 
      if(fotoperfil2 !== null || fotoperfil2 !== undefined || fotoperfil2 !==""){
         const storagePath = path.resolve(fotoperfil2);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }
      // Update the user properties
      user.nombre = nombre.toUpperCase; 
      user.direccion = direccion;     
      user.telefono = telefono;            
      user.genero = genero.toLowerCase();
      user.fecha_nacimiento = fecha_nacimiento;
      user.activo = activo;
      user.confirmado = confirmado;
      user.fotoperfil = img.path;
      if(roles){
         const foundRoles = await Role.find({nombre: {$in: roles}});      
         user.roles = foundRoles.map(role => role._id);    
      }  
            
      // Save the updated user
      await user.save();

      return res.status(httpCode[200].code).json({
         data_send: {"nombre": user.nombre,
                     "fecha_nacimiento": user.fecha_nacimiento,
                     "direccion": user.direccion,
                     "correo": user.correo,
                     "telefono": user.telefono,
                     "confirmado": user.confirmado,                                          
                     "activo": user.activo,
         },
         num_status: httpCode[200].code,
         msg_status: 'User updated successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }
}

export const deleteChofer = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      }
      // Find the user by userId and Delete the user
      const user = await User.findById(id);
      
      if (!user) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'User not found'
         });
      }else{
         user.activo = false;  //modificamos el campo activo a false, hacemos un borrado lógico del usuario
         await user.save();
         return res.status(httpCode[200].code).json({
            //data_send:user,
            num_status: httpCode[200].code,
            msg_status: 'User deleted successfully'
         });
      }
                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }
}

export const uploadimg = async (req: Request, res: Response): Promise<Response> => {
   const {id} = req?.body;
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id is invalid'
      });
   }
   var img = Object();
   var pathimg = "";     
   img = req.file; 
   const user = await User.findById(id);
   
   if (!user) {
      return res.status(httpCode[404].code).json({
         data_send: "",
         num_status: httpCode[404].code,
         msg_status: 'User not found'
      });
   }else{
      if(user.fotoperfil !== null || user.fotoperfil !==""){
         const storagePath = path.resolve(user.fotoperfil);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }
      user.fotoperfil = img.path; 
      try {         
         await user.save();
      } catch (error) {
         return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '         
         });
      }
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: "Imagen Agregada",         
         num_status:httpCode[201].code,
         msg_status: 'Image user created successfully.'
      });
   }

}
