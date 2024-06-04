/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de clubs
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import User from "../models/users.models";
import Role from "../models/role.models";
import Linea from "../models/organizacion.models";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";
import {getToken, getTokenData} from "../config/config.jwt";
import {sendMail, getTemplateHtml} from "../config/config.mail";
import  utilsHandle  from "../utils/utilsHandle";
import fs from 'fs-extra';
import path from 'path';


export const getLinea = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id no es válido'
      });
   }
   const org = await Linea.findById(id);
   
   try {
      if(!org){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Organización no encontrada'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: org,
         num_status: httpCode[200].code,
         msg_status: 'Organización no encontrada'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (organización)'         
      });
   }
   
}

export const getDataLineas = async (req: Request, res: Response): Promise<Response> => {
   const data = await Linea.find();
      
   try {
      if(data.length === 0){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Organización no encontrada'
         });
      }
      return res.status(httpCode[204].code).json({
         data_send: data,
         num_status: httpCode[204].code,
         msg_status: 'Organización no encontrada'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (organización)'         
      });
   }
   
}

export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const {userid,paisid,estadoid,municipioid,ciudadid,nro_cps,fecha_exp_cps,fecha_venc_cps,
         codigo_cps,modalidad_servicio,tipologia_unidades,cupo_autorizado,nombre_org,
         tipo_organizacion,fecha_registro,duracion_junta,fecha_venc_junta,nombre_oficina_registro,
         nro_rif,fecha_inscrip_rif,fecha_emision_rif,fecha_venc_rif,direccion_fiscal,nro_socios,
         nro_rutas,descripcion_rutas,img_acta_constitutiva,img_rif,img_cps,
         img_ult_acta_asamblea} = req?.body
      
   const data = await Linea.findOne({nombre_org: nombre_org.toUpperCase()})
   if(data) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'The organization already exists!'         
      })
   }
      
   const newLinea = new Linea({       
      userid,
      paisid,
      estadoid,
      municipioid,
      ciudadid,
      nro_cps,
      fecha_exp_cps,
      fecha_venc_cps,
      codigo_cps,
      modalidad_servicio,
      tipologia_unidades,
      cupo_autorizado,
      nombre_org,
      tipo_organizacion,
      fecha_registro,
      duracion_junta,
      fecha_venc_junta,
      nombre_oficina_registro,
      nro_rif,
      fecha_inscrip_rif,
      fecha_emision_rif,
      fecha_venc_rif,
      direccion_fiscal,
      nro_socios,
      nro_rutas,
      descripcion_rutas,
      img_acta_constitutiva,
      img_rif,
      img_cps,
      img_ult_acta_asamblea  
   });

   try {
      
      await newLinea.save();
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: newLinea,         
         num_status:httpCode[201].code,
         msg_status: 'Línea creada satisfactoriamente.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (organización)'         
      });
   }
}

export const register = async (req: Request, res: Response): Promise<Response> => {
   
   const {  dni, nombre, fecha_nacimiento, genero, correo, telefono, 
            clave, direccion, roles, idioma,
            paisid,estadoid,municipioid,ciudadid,nro_cps,fecha_exp_cps,fecha_venc_cps,
            codigo_cps,modalidad_servicio,tipologia_unidades,cupo_autorizado,nombre_org,
            tipo_organizacion,fecha_registro,duracion_junta,fecha_venc_junta,nombre_oficina_registro,
            nro_rif,fecha_inscrip_rif,fecha_emision_rif,fecha_venc_rif,direccion_fiscal,nro_socios,
            nro_rutas,descripcion_rutas,img_acta_constitutiva,img_rif,img_cps,
            img_ult_acta_asamblea} = req?.body
      
   const user = await User.findOne({correo: correo})
   if(user) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El correo ya se ecnuentra registrado.'         
      });
   }         
   const data = await Linea.findOne({nombre_org: nombre_org.toUpperCase()})
   if(data) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'Este nombre de organización ya existe.'         
      })
   }
      
   var imgs = Object();       
   imgs = req.files; 
   if(imgs != undefined && imgs !== null && imgs){      
      var img_rif_path = imgs['img_rif'][0].path !== "" ? imgs['img_rif'][0].path : "";
      var img_cps_path = imgs['img_cps'][0].path !== "" ? imgs['img_cps'][0].path : "";
      var img_acta_constitutiva_path = imgs['img_acta_constitutiva'][0].path !== "" ? imgs['img_acta_constitutiva'][0].path : "";
      var img_ult_acta_asamblea_path = imgs['img_ult_acta_asamblea'][0].path !== "" ? imgs['img_ult_acta_asamblea'][0].path : "";
      var fotoperfil_path = imgs['fotoperfil'][0].path !== "" ? imgs['fotoperfil'][0].path : "";
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
            msg_status: 'El rol asignado al usuario, no existe.'         
         })
      }
      newUser.roles = foundRoles.map(role => role._id);
   }else{      
      newUser.roles = [];      
   }

   try {
      
      await newUser.save();
      const id = newUser._id;   
      const newLinea = new Linea({       
         userid: id,
         paisid,
         estadoid,
         municipioid,
         ciudadid,
         nro_cps,
         fecha_exp_cps,
         fecha_venc_cps,
         codigo_cps,
         modalidad_servicio,
         tipologia_unidades,
         cupo_autorizado,
         nombre_org,
         tipo_organizacion,
         fecha_registro,
         duracion_junta,
         fecha_venc_junta,
         nombre_oficina_registro,
         nro_rif,
         fecha_inscrip_rif,
         fecha_emision_rif,
         fecha_venc_rif,
         direccion_fiscal,
         nro_socios,
         nro_rutas,
         descripcion_rutas,
         img_acta_constitutiva,
         img_rif,
         img_cps,
         img_ult_acta_asamblea  
      });
      await newLinea.save();      
      
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
         msg_status: 'Usuario creado satisfactoriamente, se ha enviado un correo para confirmar su cuenta, verifique su carpeta spam.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'error guardando usuario-organizador (organizador) '
      });
   }      
}

export const update = async (req: Request, res: Response): Promise<Response> => {
   try {
      
      const { id } = req.params; 
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id no es válido'
         });
      }
      const { userid,paisid,estadoid,municipioid,ciudadid,nro_cps,fecha_exp_cps,fecha_venc_cps,
         codigo_cps,modalidad_servicio,tipologia_unidades,cupo_autorizado,nombre_org,
         tipo_organizacion,fecha_registro,duracion_junta,fecha_venc_junta,nombre_oficina_registro,
         nro_rif,fecha_inscrip_rif,fecha_emision_rif,fecha_venc_rif,direccion_fiscal,nro_socios,
         nro_rutas,descripcion_rutas,img_acta_constitutiva,img_rif,img_cps,
         img_ult_acta_asamblea} = req.body;

      
      const data = await Linea.findById(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Organización no encontrada'
         });
      }

      
      data.paisid                      = paisid,
      data.estadoid                    = estadoid,
      data.municipioid                 = municipioid,
      data.ciudadid                    = ciudadid,
      data.nro_cps                     = nro_cps,
      data.fecha_exp_cps               = fecha_exp_cps,
      data.fecha_venc_cps              = fecha_venc_cps,
      data.codigo_cps                  = codigo_cps,
      data.modalidad_servicio          = modalidad_servicio,
      data.tipologia_unidades          = tipologia_unidades,
      data.cupo_autorizado             = cupo_autorizado,
      data.nombre_org                  = nombre_org,
      data.tipo_organizacion           = tipo_organizacion,
      data.fecha_registro              = fecha_registro,
      data.duracion_junta              = duracion_junta,
      data.fecha_venc_junta            = fecha_venc_junta,
      data.nombre_oficina_registro     = nombre_oficina_registro,
      data.nro_rif                     = nro_rif,
      data.fecha_inscrip_rif           = fecha_inscrip_rif,
      data.fecha_emision_rif           = fecha_emision_rif,
      data.fecha_venc_rif              = fecha_venc_rif,
      data.direccion_fiscal            = direccion_fiscal,
      data.nro_socios                  = nro_socios,
      data.nro_rutas                   = nro_rutas,
      data.descripcion_rutas           = descripcion_rutas,
      data.img_acta_constitutiva       = img_acta_constitutiva,
      data.img_rif                     = img_rif,
      data.img_cps                     = img_cps,
      data.img_ult_acta_asamblea       = img_ult_acta_asamblea

      await data.save();

      return res.status(200).json({
         data_send: {                  
            "pais"                     :data.paisid,
            "estado"                   :data.estadoid,
            "municipio"                :data.municipioid,
            "ciudad"                   :data.ciudadid,
            "Nro de CPS"               :data.nro_cps,            
            "Fecha exp CPS"            :data.fecha_exp_cps,
            "Fecha Vencimiento"        :data.fecha_venc_cps,
            "Código CPS"               :data.codigo_cps,
            "Modalidad Servicio"       :data.modalidad_servicio,
            "Tipología de unidades"    :data.tipologia_unidades,
            "Cupo Autorizado"          :data.cupo_autorizado,
            "Nombre Organización"      :data.nombre_org,
            "Tipo Organización"        :data.tipo_organizacion,
            "Fecha de registro"        :data.fecha_registro,
            "Duración de la junta"     :data.duracion_junta,
            "Fecha Vencimiento junta"  :data.fecha_venc_junta,
            "Oficina de Registro"      :data.nombre_oficina_registro,
            "Número Rif"               :data.nro_rif,
            "Fecha Inscripción Rif"    :data.fecha_inscrip_rif,
            "Fecha Emisión Rif"        :data.fecha_emision_rif,
            "Fecha Vencimiento Rif"    :data.fecha_venc_rif,
            "Dirección"                :data.direccion_fiscal,
            "Número de socios"         :data.nro_socios,
            "Número de rutas"          :data.nro_rutas,
            "Descripción de rutas"     :data.descripcion_rutas,                                                   
         },
         num_status: 0,
         msg_status: 'Organización modificada satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (organización)'         
      });
   }
}

export const deleteLinea = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id no es válido'
         });
      }
      const data = await Linea.findById(id);
      
      if (!data) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'Organización no encontrada.'
         });
      }else{
         data.activo = false;  
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send:{
               "Organización" : data.nombre_org.toUpperCase(),
               "Número Rif"   : data.nro_rif.toUpperCase(),
               "Ubicación"    : data.direccion_fiscal
            },
            num_status: httpCode[200].code,
            msg_status: 'Organización eliminada satisfactoriamente.'
         });
      }                        
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (organización)'         
      });
   }
}

export const activarLinea = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id no es válido'
         });
      }
      const data = await Linea.findById(id);
      
      if (!data) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'Organización no encontrada.'
         });
      }else{
         data.activo = true;  
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send:{
               "Organización" : data.nombre_org.toUpperCase(),
               "Número Rif"   : data.nro_rif.toUpperCase(),
               "Ubicación"    : data.direccion_fiscal
            },
            num_status: httpCode[200].code,
            msg_status: 'Organización activada satisfactoriamente.'
         });
      }                        
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (organización)'         
      });
   }
}
