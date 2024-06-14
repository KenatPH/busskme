/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de usuarios
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import User from "../models/users.models";
import Role from "../models/role.models";
import {getToken, getTokenData} from "../config/config.jwt";
import {sendMail, getTemplateHtml} from "../config/config.mail";
import  utilsHandle  from "../utils/utilsHandle";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";
import fs from 'fs-extra';
import path from 'path';

export const register = async (req: Request, res: Response): Promise<Response> => {
   
   const { dni, nombre, fecha_nacimiento, genero, correo, telefono, 
           clave, idioma, direccion, roles} = req?.body
   
   var img = Object();  let fotoperfil_path = "";
   img = req.file; 
   if(img != undefined && img !== null && img){  
      fotoperfil_path  = img['fotoperfil']?.[0].path ?? "";
   }     
   
   
   const user = await User.findOne({correo: correo})
   if(user) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El usuario ya existe.'         
      });      
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
      newUser.roles = [];            
   }

   try {
      
      await newUser.save();

      const id = newUser._id;                  
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
         msg_status: 'There was a problem with the server, try again later '+error         
      });
   }
}

export const registeradmin = async (req: Request, res: Response): Promise<Response> => {
   
   if(!req.body && req.body.length == 0 && req.body == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'Los datos no están llegando de manera correcta.'         
      });
   }
   const { dni, nombre, fecha_nacimiento, genero, correo, telefono, 
           idioma, clave, direccion, roles} = req?.body
   
   const user = await User.findOne({correo: correo})
   if(user) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'The user already exists!'         
      });
   }
   
   var img = Object(); let fotoperfil_path = "";
   img = req.file;
   if(img != undefined && img !== null && img){  
      fotoperfil_path  = img['fotoperfil']?.[0].path ?? "";
   }
         
   
   
   
   const last = await User.findOne().sort({idcode: -1});
   const idcode = last ? last.idcode + 1 : 1; //generamos un idcode para el usuario   
   const newUser = new User({
      idcode: idcode,      
      dni,
      nombre,
      fecha_nacimiento,
      genero: genero.toLowerCase(),
      correo,
      telefono, 
      fotoperfil: fotoperfil_path,
      direccion,
      clave, 
      idioma: idioma.toLowerCase()   
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
      newUser.roles = [];      
   }

   try {
      
      await newUser.save();
      const id = newUser._id;                     
      const token = getToken({ correo, id, idcode, telefono, roles},'2d');         
      const accion = "confirmar";
      const html = getTemplateHtml(nombre, token, idcode, accion, "", "admin");      
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
         msg_status: 'There was a problem with the server, try again later '         
      });
   }
}

export const update = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      const { nombre, direccion, telefono, genero, fecha_nacimiento, 
              idioma,  roles } = req.body;

      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido.'
         });
      }
      
      const user = await User.findById(id);

      if (!user) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'User not found'
         });
      }
      var img = Object();  
      let fotoperfil_path = "";
      img = req.file;
      if(img != undefined && img !== null && img){  
         fotoperfil_path  = img['fotoperfil']?.[0].path ?? "";
      }     
      
      if(fotoperfil_path !== "" && fotoperfil_path !== undefined && fotoperfil_path !== null) {
         const storagePath = path.resolve(user.fotoperfil);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }else{
         fotoperfil_path = user.fotoperfil;
      } 
      
      user.nombre             = nombre.toUpperCase; 
      user.direccion          = direccion;     
      user.telefono           = telefono;            
      user.genero             = genero.toLowerCase();
      user.fecha_nacimiento   = fecha_nacimiento;            
      user.fotoperfil         = fotoperfil_path;
      user.idioma             = idioma.toLowerCase()
      if(roles){
         const foundRoles = await Role.find({nombre: {$in: roles}});      
         user.roles = foundRoles.map(role => role._id);    
      }  

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

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
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

export const activarUser = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      }
      
      const user = await User.findById(id);
      
      if (!user) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'User not found'
         });
      }else{
         user.activo = true;  
         await user.save();
         return res.status(httpCode[200].code).json({
            data_send: "",
            num_status: httpCode[200].code,
            msg_status: 'User activaded successfully'
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
