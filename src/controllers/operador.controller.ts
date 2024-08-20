

import express, { Request, Response } from "express";
import User from "../models/users.models";
import Role from "../models/role.models";
import Operador from "../models/operador.models";
import {getToken, getTokenData} from "../config/config.jwt";
import {sendMail, getTemplateHtml} from "../config/config.mail";
import  utilsHandle  from "../utils/utilsHandle";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";
import fs from 'fs-extra';
import path from 'path';
import config from "../config/config";


export const getOperador = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id no es válido'
      });
   }
   const data = await Operador.findById(id)
      .populate('userid','nombre genero fecha_nacimiento dni telefono correo direccion idioma fotoperfil');
   
   try {
      if(!data){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Operador no encontrado.'
         });
      }      
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Operador encontrado satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (Operador)'         
      });
   }   
}
export const getOperadorByUserId = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id no es válido'
      });
   }
   const data = await Operador.findOne({userid:id})
   .populate('userid','nombre genero fecha_nacimiento dni telefono correo direccion idioma fotoperfil');
   
   try {
      if(!data){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Operador no encontrado.'
         });
      }      
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Operador encontrado satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (operador)'         
      });
   }   
}

export const getDataOperadores = async (req: Request, res: Response): Promise<Response> => {
   const data = await Operador.find()
      .populate('userid','nombre genero fecha_nacimiento dni telefono correo direccion idioma fotoperfil');
      
   try {
      if(data.length === 0){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Operador no encontrado.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Operador encontrado satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (operador)'         
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
   
   if(!dni || dni === null || dni =="" || dni == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo dni es obligatorio, verifique.'         
      });
   } 
   if(!fecha_venc_dni || fecha_venc_dni === null || fecha_venc_dni =="" || fecha_venc_dni == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha de vencimiento del dni es obligatorio, verifique.'      
      });
   }

   if(!nombre || nombre === null || nombre =="" || nombre == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre es obligatorio, verifique.'         
      });
   } 
   if(!fecha_nacimiento || fecha_nacimiento === null || fecha_nacimiento =="" || fecha_nacimiento == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha de nacimiento es obligatoria, verifique.'         
      });
   } 
   if(!genero || genero === null || genero ==="" || genero === undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo genero es obligatorio, verifique.'         
      });
   }else{
      if(genero !== "masculino" && genero !== "femenino"){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El valor de genero no es correcto, debe ser masculino o femenino.'
         }); 
      }
   }

   if(!correo || correo === null || correo =="" || correo == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo correo es obligatorio, verifique.'         
      });
   }  

   if(!telefono || telefono === null || telefono =="" || telefono == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo teléfono es obligatorio, verifique.'         
      });
   } 
   if(!clave || clave == null || clave == undefined || clave == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', La clave es requerida.'
      });          
   }else{
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,50}$/;
      if(!passRegex.test(clave)) {            
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', invalid password in authentication, you must use at least one lowercase letter, one uppercase letter, one number and at least one special character @$!%*#?&.'
         });
         
      }   
   }  
   if(!idioma || idioma === null || idioma =="" || idioma == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo idioma es obligatorio, verifique.'         
      });
   }   
   if(!direccion || direccion === null || direccion =="" || direccion == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo direccion es obligatorio, verifique.'         
      });
   }
   if(!nro_rif || nro_rif === null || nro_rif =="" || nro_rif == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nro de rif es obligatorio, verifique.'         
      });
   }
   if(!fecha_insc_rif || fecha_insc_rif === null || fecha_insc_rif =="" || fecha_insc_rif == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nro de rif es obligatorio, verifique.'         
      });
   }
   
   if(!fecha_venc_rif || fecha_venc_rif === null || fecha_venc_rif =="" || fecha_venc_rif == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha de vencimiento del rif es obligatorio, verifique.'         
      });
   }
   
   
   
   
   if(!carga_familiar || carga_familiar === null || carga_familiar =="" || carga_familiar == undefined){
      let carga_familiar = 0;
   }
   if(!idiomas || idiomas === null || idiomas =="" || idiomas == undefined){
      let idiomas = "";
   }
   if(!roles || roles == null || roles == undefined || roles == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El rol del usuario es requerido.'
      }); 
   }else{
      if(roles === "operador"){
         if(!nro_licencia || nro_licencia === null || nro_licencia =="" || nro_licencia == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo número de licencia es obligatorio, verifique.'         
            });
         }
         if(!fecha_emision_lic || fecha_emision_lic === null || fecha_emision_lic =="" || fecha_emision_lic == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de emisión de licencia es obligatorio, verifique.'         
            });
         }
         if(!fecha_venc_lic || fecha_venc_lic === null || fecha_venc_lic =="" || fecha_venc_lic == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de vencimiento de licencia es obligatorio, verifique.'         
            });
         }
         if(!grado_licencia || grado_licencia === null || grado_licencia =="" || grado_licencia == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de emisión de licencia es obligatorio, verifique.'         
            });
         }
         if(!nro_cert_medico || nro_cert_medico === null || nro_cert_medico =="" || nro_cert_medico == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo nro de certificado médico es obligatorio, verifique.'         
            });
         }
         if(!fecha_emision_cermed || fecha_emision_cermed === null || fecha_emision_cermed =="" || fecha_emision_cermed == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de emisión del certificado médico es obligatorio, verifique.'         
            });
         }
         if(!fecha_venc_cermed || fecha_venc_cermed === null || fecha_venc_cermed =="" || fecha_venc_cermed == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de vencimiento del certificado médico es obligatorio, verifique.'         
            });
         }
         if(!grado_cermed || grado_cermed === null || grado_cermed =="" || grado_cermed == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo grado del certificado médico es obligatorio, verifique.'         
            });
         }
      }else{
         if(!nro_licencia || nro_licencia === null || nro_licencia =="" || nro_licencia == undefined){
            let nro_licencia = "";
         }
         if(!fecha_emision_lic || fecha_emision_lic === null || fecha_emision_lic =="" || fecha_emision_lic == undefined){
            let fecha_emision_lic = "";
         }
         if(!fecha_venc_lic || fecha_venc_lic === null || fecha_venc_lic =="" || fecha_venc_lic == undefined){
            let fecha_venc_lic = "";
         }
         if(!grado_licencia || grado_licencia === null || grado_licencia =="" || grado_licencia == undefined){
            let grado_licencia = "";
         }
         if(!nro_cert_medico || nro_cert_medico === null || nro_cert_medico =="" || nro_cert_medico == undefined){
            let nro_cert_medico = "";
         }
         if(!fecha_emision_cermed || fecha_emision_cermed === null || fecha_emision_cermed =="" || fecha_emision_cermed == undefined){
            let fecha_emision_cermed = "";
         }
         if(!fecha_venc_cermed || fecha_venc_cermed === null || fecha_venc_cermed =="" || fecha_venc_cermed == undefined){
            let fecha_venc_cermed = "";
         }
         if(!grado_cermed || grado_cermed === null || grado_cermed =="" || grado_cermed == undefined){
            let grado_cermed = "";
         }         
      }
   }
        
   var imgs = Object();  let fotoperfil_path = ""; let imagen_dni_path =""; let imagen_licencia_path = "";
   let imagen_cermed_path = "";       
   imgs = req.files;  
   if(imgs != undefined && imgs !== null && imgs){ 
      if(imgs['imagen_cermed'] != undefined && imgs['imagen_cermed'] !== null && imgs['imagen_cermed']){ 
         imagen_cermed_path = imgs['imagen_cermed'][0].path !== "" ? imgs['imagen_cermed'][0].path : "";
      }else{
         imagen_cermed_path = "";
      }
      if(imgs['imagen_dni'] != undefined && imgs['imagen_dni'] !== null && imgs['imagen_dni']){ 
         imagen_dni_path = imgs['imagen_dni'][0].path !== "" ? imgs['imagen_dni'][0].path : "";
      }else{
         imagen_dni_path = "";
      }         
      if(imgs['imagen_licencia'] != undefined && imgs['imagen_licencia'] !== null && imgs['imagen_licencia']){ 
         imagen_licencia_path = imgs['imagen_licencia'][0].path !== "" ? imgs['imagen_licencia'][0].path : "";
      }else{
         imagen_licencia_path = "";
      }
      if(imgs['fotoperfil'] != undefined && imgs['fotoperfil'] !== null && imgs['fotoperfil']){ 
         fotoperfil_path = imgs['fotoperfil'][0].path !== "" ? imgs['fotoperfil'][0].path : "";
      }else{
         fotoperfil_path = "";
      }
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
      const operador = new Operador({
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
         carga_familiar: carga_familiar, 
         grado_instruccion,
         idiomas: idiomas,
         activo:true
      });
      await operador.save();

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
         msg_status: httpCode[600].es
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (operador-user) '+error         
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
      const operador = new Operador({
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
         idiomas,
         activo:true
      });
      await operador.save();      
      
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
         msg_status: httpCode[600].es
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'error guardando usuario-operador (operador) '+error
      });
   }
}

export const update = async (req: Request, res: Response): Promise<Response> => {
   
   const { id } = req.params;
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id is invalid'
      });
   }

   const { dni, nombre, fecha_nacimiento, genero,  telefono,
      direccion, roles, idioma, lugar_nacimiento, nro_rif, fecha_insc_rif,fecha_emision_rif,
      fecha_venc_rif, fecha_venc_dni, nro_licencia, fecha_emision_lic,
      fecha_venc_lic, grado_licencia, nro_cert_medico, fecha_emision_cermed,
      fecha_venc_cermed, grado_cermed, carga_familiar, grado_instruccion,
      idiomas} = req?.body
   
   const operador = await Operador.findById(id);
   if (!operador) {
      return res.status(httpCode[204].code).json({
         data_send: "",
         num_status: httpCode[204].code,
         msg_status: 'Operador no existe.'
      });
   }

   const user = await User.findById(operador.userid);

   if (!user) {
      return res.status(httpCode[204].code).json({
         data_send: "",
         num_status: httpCode[204].code,
         msg_status: 'Usuario vinculado al operador no encontrado'
      });
   }   

   if(grado_instruccion === null || grado_instruccion === undefined || !grado_instruccion || !ObjectId.isValid(grado_instruccion)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El grado de instrucción no es un Id válido'
      });
   }
   
   if(!dni || dni === null || dni =="" || dni == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo dni es obligatorio, verifique.'         
      });
   } 
   if(!fecha_venc_dni || fecha_venc_dni === null || fecha_venc_dni =="" || fecha_venc_dni == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha de vencimiento del dni es obligatorio, verifique.'      
      });
   }

   if(!nombre || nombre === null || nombre =="" || nombre == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre es obligatorio, verifique.'         
      });
   } 
   if(!fecha_nacimiento || fecha_nacimiento === null || fecha_nacimiento =="" || fecha_nacimiento == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha de nacimiento es obligatoria, verifique.'         
      });
   } 
   if(!genero || genero === null || genero ==="" || genero === undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo genero es obligatorio, verifique.'         
      });
   }else{
      if(genero !== "masculino" && genero !== "femenino"){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El valor de genero no es correcto, debe ser masculino o femenino.'
         }); 
      }
   }
  
   if(!telefono || telefono === null || telefono =="" || telefono == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo teléfono es obligatorio, verifique.'         
      });
   } 
  
   if(!idioma || idioma === null || idioma =="" || idioma == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo idioma es obligatorio, verifique.'         
      });
   }   
   if(!direccion || direccion === null || direccion =="" || direccion == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo direccion es obligatorio, verifique.'         
      });
   }
   if(!nro_rif || nro_rif === null || nro_rif =="" || nro_rif == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nro de rif es obligatorio, verifique.'         
      });
   }
   if(!fecha_insc_rif || fecha_insc_rif === null || fecha_insc_rif =="" || fecha_insc_rif == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nro de rif es obligatorio, verifique.'         
      });
   }
   
   if(!fecha_venc_rif || fecha_venc_rif === null || fecha_venc_rif =="" || fecha_venc_rif == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha de vencimiento del rif es obligatorio, verifique.'         
      });
   }
      
   if(!carga_familiar || carga_familiar === null || carga_familiar =="" || carga_familiar == undefined){
      let carga_familiar = 0;
   }
   if(!idiomas || idiomas === null || idiomas =="" || idiomas == undefined){
      let idiomas = "";
   }
   if(!roles || roles == null || roles == undefined || roles == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El rol del usuario es requerido.'
      }); 
   }else{
      if(roles === "operador"){
         if(!nro_licencia || nro_licencia === null || nro_licencia =="" || nro_licencia == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo número de licencia es obligatorio, verifique.'         
            });
         }
         if(!fecha_emision_lic || fecha_emision_lic === null || fecha_emision_lic =="" || fecha_emision_lic == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de emisión de licencia es obligatorio, verifique.'         
            });
         }
         if(!fecha_venc_lic || fecha_venc_lic === null || fecha_venc_lic =="" || fecha_venc_lic == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de vencimiento de licencia es obligatorio, verifique.'         
            });
         }
         if(!grado_licencia || grado_licencia === null || grado_licencia =="" || grado_licencia == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de emisión de licencia es obligatorio, verifique.'         
            });
         }
         if(!nro_cert_medico || nro_cert_medico === null || nro_cert_medico =="" || nro_cert_medico == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo nro de certificado médico es obligatorio, verifique.'         
            });
         }
         if(!fecha_emision_cermed || fecha_emision_cermed === null || fecha_emision_cermed =="" || fecha_emision_cermed == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de emisión del certificado médico es obligatorio, verifique.'         
            });
         }
         if(!fecha_venc_cermed || fecha_venc_cermed === null || fecha_venc_cermed =="" || fecha_venc_cermed == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo fecha de vencimiento del certificado médico es obligatorio, verifique.'         
            });
         }
         if(!grado_cermed || grado_cermed === null || grado_cermed =="" || grado_cermed == undefined){
            return res.status(httpCode[409].code).json({
               data_send: "",         
               num_status:httpCode[409].code,
               msg_status: 'El campo grado del certificado médico es obligatorio, verifique.'         
            });
         }
      }else{
         if(!nro_licencia || nro_licencia === null || nro_licencia =="" || nro_licencia == undefined){
            let nro_licencia = "";
         }
         if(!fecha_emision_lic || fecha_emision_lic === null || fecha_emision_lic =="" || fecha_emision_lic == undefined){
            let fecha_emision_lic = "";
         }
         if(!fecha_venc_lic || fecha_venc_lic === null || fecha_venc_lic =="" || fecha_venc_lic == undefined){
            let fecha_venc_lic = "";
         }
         if(!grado_licencia || grado_licencia === null || grado_licencia =="" || grado_licencia == undefined){
            let grado_licencia = "";
         }
         if(!nro_cert_medico || nro_cert_medico === null || nro_cert_medico =="" || nro_cert_medico == undefined){
            let nro_cert_medico = "";
         }
         if(!fecha_emision_cermed || fecha_emision_cermed === null || fecha_emision_cermed =="" || fecha_emision_cermed == undefined){
            let fecha_emision_cermed = "";
         }
         if(!fecha_venc_cermed || fecha_venc_cermed === null || fecha_venc_cermed =="" || fecha_venc_cermed == undefined){
            let fecha_venc_cermed = "";
         }
         if(!grado_cermed || grado_cermed === null || grado_cermed =="" || grado_cermed == undefined){
            let grado_cermed = "";
         }         
      }
   }
        
   var imgs = Object();  let fotoperfil_path = ""; let imagen_dni_path =""; let imagen_licencia_path = "";
   let imagen_cermed_path = "";       
   imgs = req.files;  
   if(imgs != undefined && imgs !== null && imgs){ 
      fotoperfil_path  = imgs['imagen_cermed']?.[0].path ?? "";
      imagen_cermed_path = imgs['imagen_cermed']?.[0].path ?? "";
      imagen_dni_path = imgs['imagen_dni']?.[0].path ?? "";    
      
      if(fotoperfil_path !== "" && fotoperfil_path !== undefined && fotoperfil_path !== null) {
         const storagePath = path.resolve(user.fotoperfil);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }else{
         fotoperfil_path = user.fotoperfil;
      } 
      if(imagen_cermed_path !== "" && imagen_cermed_path !== undefined && imagen_cermed_path !== null) {
         const storagePath = path.resolve(operador.imagen_cermed);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }else{
         imagen_cermed_path = operador.imagen_cermed;
      }
      if(imagen_dni_path !== "" && imagen_dni_path !== undefined && imagen_dni_path !== null) {
         const storagePath = path.resolve(operador.imagen_dni);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }else{
         imagen_dni_path = operador.imagen_dni;
      }
      if(imagen_licencia_path !== "" && imagen_licencia_path !== undefined && imagen_licencia_path !== null) {
         const storagePath = path.resolve(operador.imagen_licencia);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }else{
         imagen_licencia_path = operador.imagen_licencia;
      }            
   }else{
      imagen_dni_path = operador.imagen_dni;
      imagen_licencia_path = operador.imagen_licencia;
      imagen_cermed_path = operador.imagen_cermed;
      fotoperfil_path = user.fotoperfil;
   } 

   user.nombre             = nombre,
   user.fecha_nacimiento   = fecha_nacimiento,
   user.genero             = genero,
   user.dni                = dni,   
   user.telefono           = telefono,
   user.idioma             = idioma,
   user.direccion          = direccion,
   user.fotoperfil         = fotoperfil_path

   if(roles.length > 0){
      const foundRoles = await Role.find({nombre: {$in: roles}});      
      if(!foundRoles){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'The submitted roles do not exist!'         
         })
      }      
      user.roles = foundRoles.map(role => role._id);
   }else{      
      user.roles = [];            
   }

   
   operador.lugar_nacimiento             = lugar_nacimiento, 
   operador.nro_rif                      = nro_rif, 
   operador.fecha_insc_rif               =  fecha_insc_rif, 
   operador.fecha_emision_rif            = fecha_emision_rif,  
   operador.fecha_venc_rif               = fecha_venc_rif,  
   operador.fecha_venc_dni               = fecha_venc_dni,      
   operador.imagen_dni                   = imagen_dni_path, 
   operador.nro_licencia                 = nro_licencia, 
   operador.fecha_emision_lic            = fecha_emision_lic, 
   operador.fecha_venc_lic               = fecha_venc_lic,  
   operador.grado_licencia               = grado_licencia,  
   operador.imagen_licencia              = imagen_licencia_path, 
   operador.nro_cert_medico              = nro_cert_medico, 
   operador.fecha_emision_cermed         = fecha_emision_cermed, 
   operador.fecha_venc_cermed            = fecha_venc_cermed, 
   operador.grado_cermed                 = grado_cermed,           
   operador.imagen_cermed                = imagen_cermed_path, 
   operador.carga_familiar               = carga_familiar, 
   operador.grado_instruccion            = grado_instruccion,
   operador.idiomas                      = idiomas

   try {
      
      await user.save();            
      await operador.save();

      
      return res.status(httpCode[201].code).json(
      {  
         data_send: {            
            "Nombre y apellidos": user.nombre,
            "cédula": user.dni,
            "Fecha vencimiento dni":operador.fecha_venc_dni,      
            "imagen dni":operador.imagen_dni                   = imagen_dni_path, 
            "teléfono": user.telefono,
            "dirección": user.direccion, 
            "correo": user.correo,
            "Lugar de nacimiento":operador.lugar_nacimiento, 
            "Número de rif":operador.nro_rif, 
            "Fecha inscripción rif":operador.fecha_insc_rif, 
            "Fecha emisión rif":operador.fecha_emision_rif,  
            "Fecha vencimiento rif":operador.fecha_venc_rif,  
            
            "Número de licencia":operador.nro_licencia, 
            "fechas emisión licencia":operador.fecha_emision_lic, 
            "Fecha vencimiento licencia":operador.fecha_venc_lic,  
            "Grado de licencia":operador.grado_licencia,  
            "Imagen licencia":operador.imagen_licencia, 
            "Nro certif médico":operador.nro_cert_medico, 
            "Fecha emisión certi médico":operador.fecha_emision_cermed, 
            "Fecha vencimiento":operador.fecha_venc_cermed, 
            "Grado certif médico":operador.grado_cermed,           
            "Imagen certif médico":operador.imagen_cermed, 
            "Carga familiar":operador.carga_familiar, 
            "Grado de instrucción":operador.grado_instruccion,
            "Idiomas":operador.idiomas
         },         
         num_status:httpCode[201].code,
         msg_status: httpCode[608][config.IDIOMA]
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (operador-user) '+error         
      });
   }
}

export const deleteOperador = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      }
      const operador = await Operador.findById(id);

      if (!operador) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Operador no encontrado.'
         });
      }
      const user = await User.findById(operador.userid);
      
      if (!user) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'Usuario operador no encontrado.'
         });
      }else{
         user.activo = false;  
         await user.save();
         return res.status(httpCode[200].code).json({
            data_send:"",
            num_status: httpCode[200].code,
            msg_status: 'Operador eliminado con éxito.'
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

export const activarOperador = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      }
      const operador = await Operador.findById(id);

      if (!operador) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Operador no encontrado.'
         });
      }
      const user = await User.findById(operador.userid);
      
      
      if (!user) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'Usuario operador no encontrado.'
         });
      }else{
         user.activo = true;  
         await user.save();
         return res.status(httpCode[200].code).json({
            data_send:"",
            num_status: httpCode[200].code,
            msg_status: 'Operador activado con éxito.'
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

export const testmailOperador = async (req: Request, res: Response): Promise<Response> => {
   try {
      const correo = 'krtabares@gmail.com'

      const token = getToken({ correo, id:'1321321', idcode:'987', telefono:"123", roles:[] }, '2d');

      const accion = "confirmar";
      const html = getTemplateHtml("test", token, 987, accion, "", "");

      await sendMail(correo, 'Confirmar cuenta', html);
      return res.status(httpCode[200].code).json({
         data_send: "",
         num_status: httpCode[200].code,
         msg_status: 'correo enbviado  con éxito.'
      });

   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      });
   }
}