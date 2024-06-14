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
   
   const { dni, nombre, fecha_nacimiento, genero, correo, telefono,
      clave, direccion, roles, idioma, lugar_nacimiento, nro_rif, fecha_insc_rif,fecha_emision_rif,
      fecha_venc_rif, fecha_venc_dni, nro_licencia, fecha_emision_lic,
      fecha_venc_lic, grado_licencia, nro_cert_medico, fecha_emision_cermed,
      fecha_venc_cermed, grado_cermed, carga_familiar, grado_instruccion,
      idiomas} = req?.body
   
   if(grado_instruccion === null || grado_instruccion === undefined || !grado_instruccion || !ObjectId.isValid(grado_instruccion)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El grado de instrucción no es un Id válido'
      });
   }
   
   if(!dni && dni === null && dni =="" && dni == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo dni es obligatorio, verifique.'         
      });
   }   
   if(!nombre && nombre === null && nombre =="" && nombre == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre es obligatorio, verifique.'         
      });
   } 
   if(!fecha_nacimiento && fecha_nacimiento === null && fecha_nacimiento =="" && fecha_nacimiento == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha de nacimiento es obligatorio, verifique.'         
      });
   } 
   if(!genero && genero === null && genero =="" && genero == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo genero es obligatorio, verifique.'         
      });
   } 
   if(!correo && correo === null && correo =="" && correo == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo correo es obligatorio, verifique.'         
      });
   }  
   if(!telefono && telefono === null && telefono =="" && telefono == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo teléfono es obligatorio, verifique.'         
      });
   } 
   if(!clave && clave === null && clave =="" && clave == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo clave es obligatorio, verifique.'         
      });
   }   
   if(!idioma && idioma === null && idioma =="" && idioma == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo idioma es obligatorio, verifique.'         
      });
   }   
   if(!direccion && direccion === null && direccion =="" && direccion == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo direccion es obligatorio, verifique.'         
      });
   }
   var imgs = Object();  let fotoperfil_path = ""; let imagen_dni_path =""; let imagen_licencia_path = "";
   let imagen_cermed_path = "";       
   imgs = req.files;  
   if(imgs != undefined && imgs !== null && imgs){      
      imagen_dni_path = imgs['imagen_dni'][0].path !== "" ? imgs['imagen_dni'][0].path : "";
      imagen_licencia_path = imgs['imagen_licencia'][0].path !== "" ? imgs['imagen_licencia'][0].path : "";
      imagen_cermed_path = imgs['imagen_cermed'][0].path !== "" ? imgs['imagen_cermed'][0].path : "";
      fotoperfil_path = imgs['fotoperfil'][0].path !== "" ? imgs['fotoperfil'][0].path : "";
   }else{
      imagen_dni_path = "";
      imagen_licencia_path = "";
      imagen_cermed_path = "";
      fotoperfil_path = "";
   }          
   const user = await User.findOne({correo: correo})
   if(user) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'Ya existe un usuario con este correo.'         
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
   
   const { dni, nombre, fecha_nacimiento, genero, correo, telefono, 
           clave, direccion, roles, idioma, lugar_nacimiento, nro_rif, fecha_insc_rif,fecha_emision_rif,
           fecha_venc_rif, fecha_venc_dni,  nro_licencia, fecha_emision_lic,
           fecha_venc_lic, grado_licencia,  nro_cert_medico, fecha_emision_cermed,
           fecha_venc_cermed, grado_cermed,  carga_familiar, grado_instruccion,
           idiomas } = req?.body
   var error = [];

   if(grado_instruccion === null || grado_instruccion === undefined || !grado_instruccion || !ObjectId.isValid(grado_instruccion)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El grado de instrucción no es un Id válido'
      });
   }
   
   if(!dni && dni === null && dni =="" && dni == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo dni es obligatorio, verifique.'         
      });
   }   
   if(!nombre && nombre === null && nombre =="" && nombre == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre es obligatorio, verifique.'         
      });
   } 
   if(!fecha_nacimiento && fecha_nacimiento === null && fecha_nacimiento =="" && fecha_nacimiento == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha de nacimiento es obligatorio, verifique.'         
      });
   } 
   if(!genero && genero === null && genero =="" && genero == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo genero es obligatorio, verifique.'         
      });
   } 
   if(!correo && correo === null && correo =="" && correo == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo correo es obligatorio, verifique.'         
      });
   }  
   if(!telefono && telefono === null && telefono =="" && telefono == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo teléfono es obligatorio, verifique.'         
      });
   } 
   if(!clave && clave === null && clave =="" && clave == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo clave es obligatorio, verifique.'         
      });
   }   
   if(!idioma && idioma === null && idioma =="" && idioma == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo idioma es obligatorio, verifique.'         
      });
   }   
   if(!direccion && direccion === null && direccion =="" && direccion == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo direccion es obligatorio, verifique.'         
      });
   }
           
   const user = await User.findOne({correo: correo})
   if(user) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El usuario ya existe.'         
      });
   }
   
   var imgs = Object(); let imagen_dni_path; let imagen_licencia_path; 
   let imagen_cermed_path;  let fotoperfil_path;    
   imgs = req.files; 
   if(imgs != undefined && imgs !== null && imgs){      
      imagen_dni_path = imgs['imagen_dni'][0].path !== "" ? imgs['imagen_dni'][0].path : "";
      imagen_licencia_path = imgs['imagen_licencia'][0].path !== "" ? imgs['imagen_licencia'][0].path : "";
      imagen_cermed_path = imgs['imagen_cermed'][0].path !== "" ? imgs['imagen_cermed'][0].path : "";
      fotoperfil_path = imgs['fotoperfil'][0].path !== "" ? imgs['fotoperfil'][0].path : "";
   }else{
      imagen_dni_path = "";
      imagen_licencia_path = "";
      imagen_cermed_path = "";
      fotoperfil_path = "";
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
      direccion,
      clave,
      idioma: idioma.toLowerCase()          
   });
   
   if(roles.length > 0){
      const foundRoles = await Role.find({nombre: {$in: roles}});      
      if(!foundRoles){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El rol suministrado no existe.'         
         })
      }
      newUser.roles = foundRoles.map(role => role._id);
   }else{      
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
         msg_status: httpCode[600].message_es
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'error guardando usuario-chofer (chofer) '+error
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
      
      const user = await User.findById(id);
      
      if (!user) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'User not found'
         });
      }else{
         user.activo = false;  
         await user.save();
         return res.status(httpCode[200].code).json({
            data_send:"",
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
