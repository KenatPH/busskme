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
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
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
   const data = await Linea.find().populate('ciudadid estadoid paisid municipioid');
      
   try {
      if(data.length === 0){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Organización no encontrada'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
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

export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const {userid,paisid,estadoid,municipioid,ciudadid,nro_cps,fecha_exp_cps,fecha_venc_cps,
         codigo_cps,modalidad_servicio,tipologia_unidades,cupo_autorizado,nombre_org,
         tipo_organizacion,fecha_registro,duracion_junta,/* fecha_venc_junta, */nombre_oficina_registro,
         nro_rif,fecha_inscrip_rif,fecha_emision_rif,fecha_venc_rif,direccion_fiscal,nro_socios,
         nro_rutas,descripcion_rutas} = req?.body

      
   if(!utilsHandle.validateFecha(fecha_registro)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_registro es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }  
   if(!utilsHandle.validateFieldID(paisid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo paisid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   if(!utilsHandle.validateFieldID(estadoid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo estadoid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   if(!utilsHandle.validateFieldID(municipioid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo municipioid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   if(!utilsHandle.validateFieldID(ciudadid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo ciudadid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   if(!utilsHandle.validateFieldID(userid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo userid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(nro_cps)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nro_cps es obligatorio, es un campo alfanumérico, verifique.'         
      });
   } 
   if(!utilsHandle.validateFecha(fecha_exp_cps)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_exp_cps es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   } 
   if(!utilsHandle.validateFecha(fecha_venc_cps)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_venc_cps es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }
   if(!utilsHandle.validateFecha(fecha_inscrip_rif)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_inscrip_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   } 
   if(!utilsHandle.validateFecha(fecha_emision_rif)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_emision_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }
   if(!utilsHandle.validateFecha(fecha_venc_rif)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_venc_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }
   // if(!utilsHandle.validateFecha(fecha_venc_junta)){
   //    return res.status(httpCode[409].code).json({
   //       data_send: "",         
   //       num_status:httpCode[409].code,
   //       msg_status: 'El campo fecha_venc_junta es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
   //    });
   // }
   if(!utilsHandle.validateFieldAlfaNum(codigo_cps)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo codigo_cps es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(modalidad_servicio)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo modalidad_servicio es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(tipologia_unidades)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo tipologia_unidades es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(cupo_autorizado)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo cupo_autorizado es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(nombre_org)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre_org es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(tipo_organizacion)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo tipo_organizacion es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldNum(duracion_junta)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo duracion_junta es requerido, es un campo númerico, sólo acepta números.'
      });          
   }
   if(!utilsHandle.validateFieldAlfaNum(nombre_oficina_registro)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre_oficina_registro es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(nro_rif)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nro_rif es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldDireccion(direccion_fiscal)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo direccion_fiscal es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldNum(nro_socios)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_socios es requerido, es un campo númerico, sólo acepta números.'
      });          
   }
   if(!utilsHandle.validateFieldNum(nro_rutas)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_rutas es requerido, es un campo númerico, sólo acepta números.'
      });          
   }
   if(!utilsHandle.validateFieldAlfaNum(descripcion_rutas)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo descripcion_rutas es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   var imgs = Object();  let img_acta_constitutiva_path = ""; let img_rif_path =""; let img_cps_path =""; 
   let img_ult_acta_asamblea_path =""; let fotoperfil_path ="";
   imgs = req.files;  
   if(imgs != undefined && imgs !== null && imgs){ 
      if(imgs['img_acta_constitutiva'] != undefined && imgs['img_acta_constitutiva'] !== null && imgs['img_acta_constitutiva']){          
         img_acta_constitutiva_path  = imgs['img_acta_constitutiva']?.[0].path ?? "";
      }else{
         img_acta_constitutiva_path = "";
      }    
      if(imgs['img_rif'] != undefined && imgs['img_rif'] !== null && imgs['img_rif']){          
         img_rif_path  = imgs['img_rif']?.[0].path ?? "";
      }else{
         img_rif_path = "";
      }   
      if(imgs['img_cps'] != undefined && imgs['img_cps'] !== null && imgs['img_cps']){          
         img_cps_path  = imgs['img_cps']?.[0].path ?? "";
      }else{
         img_cps_path = "";
      } 
      if(imgs['img_ult_acta_asamblea'] != undefined && imgs['img_ult_acta_asamblea'] !== null && imgs['img_ult_acta_asamblea']){          
         img_ult_acta_asamblea_path  = imgs['img_ult_acta_asamblea']?.[0].path ?? "";
      }else{
         img_ult_acta_asamblea_path = "";
      } 
      if(imgs['fotoperfil'] != undefined && imgs['fotoperfil'] !== null && imgs['fotoperfil']){          
         fotoperfil_path  = imgs['fotoperfil']?.[0].path ?? "";
      }else{
         fotoperfil_path = "";
      } 
                        
   }else{
      img_acta_constitutiva_path = "";  
      img_rif_path ="";  
      img_cps_path =""; 
      img_ult_acta_asamblea_path ="";
      fotoperfil_path="";
   }          
   const data = await Linea.findOne({nombre_org: nombre_org.toUpperCase()})
   if(data) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'The organization already exists!'         
      })
   }

   let vec = fecha_registro.split('-'); // Parsea y pasa a un vector
   let fecha = new Date(vec[0], vec[1], vec[2]); // crea el Date
   fecha.setFullYear(fecha.getFullYear() + 3); // Hace el cálculo
      
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
      fecha_venc_junta: fecha,
      nombre_oficina_registro,
      nro_rif,
      fecha_inscrip_rif,
      fecha_emision_rif,
      fecha_venc_rif,
      direccion_fiscal,
      nro_socios,
      nro_rutas,
      descripcion_rutas,
      img_acta_constitutiva: img_acta_constitutiva_path,
      img_rif: img_rif_path,
      img_cps: img_cps_path,
      img_ult_acta_asamblea: img_ult_acta_asamblea_path,  
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
      console.log(error);
      
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
            nro_rutas,descripcion_rutas} = req?.body
   
            
   if(!utilsHandle.validateFieldAlfaNum(dni)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo dni es obligatorio, es un campo alfanumérico, formato (V55555555) verifique.'         
      });
   } 
   if(!utilsHandle.validateFieldLetra(nombre)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre es obligatorio, es un campo alfabético, solo acepta letras, verifique.'         
      });
   } 
   if(!utilsHandle.validateFecha(fecha_nacimiento)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_nacimiento es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }   
   if (!utilsHandle.validateFieldLetra(genero)) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El genero es requerido, acepta sólo letras.'
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
   if(!correo && correo === null && correo =="" && correo == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo correo es obligatorio, verifique.'         
      });
   }  
   if(!utilsHandle.validateFieldNum(telefono)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El teléfono es requerido, es un campo númerico, sólo acepta números, formato (041255555555).'
      });          
   }

   if(!utilsHandle.validateFieldLetra(idioma)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El idioma es requerido, es un campo alfabético, sólo acepta letras, formato (es).'
      });          
   }
   
   if(!utilsHandle.validateFieldDireccion(direccion)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', La dirección es requerida.'
      }); 
   }
   if(!utilsHandle.validateFecha(fecha_registro)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_registro es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }  
   if(!utilsHandle.validateFieldID(paisid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo paisid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   if(!utilsHandle.validateFieldID(estadoid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo estadoid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   if(!utilsHandle.validateFieldID(municipioid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo municipioid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   
   if(!utilsHandle.validateFieldID(ciudadid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo ciudadid es obligatorio, verifique que esté enviando un id válido.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(nro_cps)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nro_cps es obligatorio, es un campo alfanumérico, verifique.'         
      });
   } 
   if(!utilsHandle.validateFecha(fecha_exp_cps)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_exp_cps es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   } 
   if(!utilsHandle.validateFecha(fecha_venc_cps)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_venc_cps es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }
   if(!utilsHandle.validateFecha(fecha_inscrip_rif)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_inscrip_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   } 
   if(!utilsHandle.validateFecha(fecha_emision_rif)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_emision_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }
   if(!utilsHandle.validateFecha(fecha_venc_rif)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_venc_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }
   if(!utilsHandle.validateFecha(fecha_venc_junta)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo fecha_venc_junta es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(codigo_cps)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo codigo_cps es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(modalidad_servicio)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo modalidad_servicio es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(tipologia_unidades)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo tipologia_unidades es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(cupo_autorizado)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo cupo_autorizado es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(nombre_org)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre_org es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(tipo_organizacion)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo tipo_organizacion es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldNum(duracion_junta)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo duracion_junta es requerido, es un campo númerico, sólo acepta números.'
      });          
   }
   if(!utilsHandle.validateFieldAlfaNum(nombre_oficina_registro)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre_oficina_registro es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldAlfaNum(nro_rif)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nro_rif es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldDireccion(direccion_fiscal)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo direccion_fiscal es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   if(!utilsHandle.validateFieldNum(nro_socios)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_socios es requerido, es un campo númerico, sólo acepta números.'
      });          
   }
   if(!utilsHandle.validateFieldNum(nro_rutas)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_rutas es requerido, es un campo númerico, sólo acepta números.'
      });          
   }
   if(!utilsHandle.validateFieldAlfaNum(descripcion_rutas)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo descripcion_rutas es obligatorio, es un campo alfanumérico, verifique.'         
      });
   }
   
   
   var imgs = Object();  let img_acta_constitutiva_path = ""; let img_rif_path =""; let img_cps_path =""; 
   let img_ult_acta_asamblea_path =""; let fotoperfil_path ="";
   imgs = req.files;  
   if(imgs != undefined && imgs !== null && imgs){ 
      if(imgs['img_acta_constitutiva'] != undefined && imgs['img_acta_constitutiva'] !== null && imgs['img_acta_constitutiva']){          
         img_acta_constitutiva_path  = imgs['img_acta_constitutiva']?.[0].path ?? "";
      }else{
         img_acta_constitutiva_path = "";
      }    
      if(imgs['img_rif'] != undefined && imgs['img_rif'] !== null && imgs['img_rif']){          
         img_rif_path  = imgs['img_rif']?.[0].path ?? "";
      }else{
         img_rif_path = "";
      }   
      if(imgs['img_cps'] != undefined && imgs['img_cps'] !== null && imgs['img_cps']){          
         img_cps_path  = imgs['img_cps']?.[0].path ?? "";
      }else{
         img_cps_path = "";
      } 
      if(imgs['img_ult_acta_asamblea'] != undefined && imgs['img_ult_acta_asamblea'] !== null && imgs['img_ult_acta_asamblea']){          
         img_ult_acta_asamblea_path  = imgs['img_ult_acta_asamblea']?.[0].path ?? "";
      }else{
         img_ult_acta_asamblea_path = "";
      } 
      if(imgs['fotoperfil'] != undefined && imgs['fotoperfil'] !== null && imgs['fotoperfil']){          
         fotoperfil_path  = imgs['fotoperfil']?.[0].path ?? "";
      }else{
         fotoperfil_path = "";
      } 
                       
   }else{
      img_acta_constitutiva_path = "";  
      img_rif_path ="";  
      img_cps_path =""; 
      img_ult_acta_asamblea_path ="";
      fotoperfil_path="";
   } 

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
         img_acta_constitutiva: img_acta_constitutiva_path,
         img_rif: img_rif_path,
         img_cps: img_cps_path,
         img_ult_acta_asamblea: img_ult_acta_asamblea_path,  
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
            newLinea                       
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
         nro_rutas,descripcion_rutas} = req.body;

      
      if(!utilsHandle.validateFecha(fecha_registro)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo fecha_registro es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
         });
      }  
      if(!utilsHandle.validateFieldID(paisid)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo paisid es obligatorio, verifique que esté enviando un id válido.'         
         });
      }
      if(!utilsHandle.validateFieldID(estadoid)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo estadoid es obligatorio, verifique que esté enviando un id válido.'         
         });
      }
      if(!utilsHandle.validateFieldID(municipioid)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo municipioid es obligatorio, verifique que esté enviando un id válido.'         
         });
      }
      
      if(!utilsHandle.validateFieldID(ciudadid)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo ciudadid es obligatorio, verifique que esté enviando un id válido.'         
         });
      }
      if(!utilsHandle.validateFieldID(userid)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo userid es obligatorio, verifique que esté enviando un id válido.'         
         });
      }
      
      if(!utilsHandle.validateFieldAlfaNum(nro_cps)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo nro_cps es obligatorio, es un campo alfanumérico, verifique.'         
         });
      } 
      if(!utilsHandle.validateFecha(fecha_exp_cps)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo fecha_exp_cps es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
         });
      } 
      if(!utilsHandle.validateFecha(fecha_venc_cps)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo fecha_venc_cps es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
         });
      }
      if(!utilsHandle.validateFecha(fecha_inscrip_rif)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo fecha_inscrip_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
         });
      } 
      if(!utilsHandle.validateFecha(fecha_emision_rif)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo fecha_emision_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
         });
      }
      if(!utilsHandle.validateFecha(fecha_venc_rif)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo fecha_venc_rif es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
         });
      }
      if(!utilsHandle.validateFecha(fecha_venc_junta)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo fecha_venc_junta es obligatorio, es un campo fecha, formato (YYYY-MM-DD) verifique.'         
         });
      }
      if(!utilsHandle.validateFieldAlfaNum(codigo_cps)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo codigo_cps es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldAlfaNum(modalidad_servicio)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo modalidad_servicio es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldAlfaNum(tipologia_unidades)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo tipologia_unidades es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldAlfaNum(cupo_autorizado)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo cupo_autorizado es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldAlfaNum(nombre_org)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo nombre_org es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldAlfaNum(tipo_organizacion)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo tipo_organizacion es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldNum(duracion_junta)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo duracion_junta es requerido, es un campo númerico, sólo acepta números.'
         });          
      }
      if(!utilsHandle.validateFieldAlfaNum(nombre_oficina_registro)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo nombre_oficina_registro es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldAlfaNum(nro_rif)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo nro_rif es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldDireccion(direccion_fiscal)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo direccion_fiscal es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
      if(!utilsHandle.validateFieldNum(nro_socios)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_socios es requerido, es un campo númerico, sólo acepta números.'
         });          
      }
      if(!utilsHandle.validateFieldNum(nro_rutas)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_rutas es requerido, es un campo númerico, sólo acepta números.'
         });          
      }
      if(!utilsHandle.validateFieldAlfaNum(descripcion_rutas)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo descripcion_rutas es obligatorio, es un campo alfanumérico, verifique.'         
         });
      }
            
      const data = await Linea.findById(id);

      if (!data) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Organización no encontrada'
         });
      }
      var imgs = Object();  let img_acta_constitutiva_path:any = []; let img_rif_path =""; let img_cps_path =""; 
      let img_ult_acta_asamblea_path =""; let fotoperfil_path ="";
      imgs = req.files;  
      if(imgs != undefined && imgs !== null && imgs){ 
         img_acta_constitutiva_path  = imgs['img_acta_constitutiva']?.[0].path ?? "";
         img_rif_path = imgs['img_rif']?.[0].path ?? "";
         img_cps_path = imgs['img_cps']?.[0].path ?? "";    
         img_ult_acta_asamblea_path = imgs['img_ult_acta_asamblea']?.[0].path ?? "";

         
         if(img_rif_path !== "" && img_rif_path !== undefined && img_rif_path !== null) {
            const storagePath = path.resolve(data.img_rif);      
            if (fs.existsSync(storagePath)) {
               await fs.unlink(storagePath);            
            }
         }else{
            img_rif_path = data.img_rif;
         }
         if(img_cps_path !== "" && img_cps_path !== undefined && img_cps_path !== null) {
            const storagePath = path.resolve(data.img_cps);      
            if (fs.existsSync(storagePath)) {
               await fs.unlink(storagePath);            
            }
         }else{
            img_cps_path = data.img_cps;
         }
                    
      }else{         
         img_rif_path = data.img_rif;
         img_cps_path = data.img_cps;
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
      data.img_rif                     = img_rif_path,
      data.img_cps                     = img_cps_path,
      

      await data.save();

      return res.status(httpCode[200].code).json({
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
         num_status: httpCode[200].code,
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
