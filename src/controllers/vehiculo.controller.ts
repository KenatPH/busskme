/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de jugadores
  Fecha creación  : 25 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import Vehiculo from "../models/vehiculos/vehiculo.models";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";
import fs from 'fs-extra';
import path from 'path';


export const getVehiculo = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El Id no es válido'
      });
   }
   const data = await Vehiculo.findById(id);
   
   try {
      if(!data){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Vehículo no enconttrado'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Vehiculo encontrado satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }   
}


export const getDataVehiculos = async (req: Request, res: Response): Promise<Response> => {
   const data = await Vehiculo.find();
      
   try {
      if(data.length === 0){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Vehículos no enconttrados.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Vehículos enconttrados satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (vehículos).'        
      });
   }   
}

export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const { userid,nro_certificado_registro, placa,serial_niv, serial_chasis,
           serial_carroceria, serial_motor, marcaid, modeloid, colorid, anno, clase,
           tipo, uso, servicio, puestos, intt_nro, fecha_emision_intt,   
           nro_autorizacion, empresa_seguro, nro_poliza,
           nro_sudeaseg, fecha_emision_poliza, fecha_venc_poliza, 
    } = req?.body

    if(userid === null || userid === undefined || !userid || !ObjectId.isValid(userid)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El Id no es válido'
      });
   }

    if(!nro_certificado_registro || nro_certificado_registro == null || nro_certificado_registro == undefined || nro_certificado_registro == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_certificado_registro es requerido.'
      });          
   }   
       
   if(!placa || placa == null || placa == undefined || placa == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo placa es requerido.'
      });          
   }
   if(!serial_niv || serial_niv == null || serial_niv == undefined || serial_niv == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo serial_niv es requerido.'
      });          
   }
   if(!serial_chasis || serial_chasis == null || serial_chasis == undefined || serial_chasis == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo serial_chasis es requerido.'
      });          
   }

   if(!serial_carroceria || serial_carroceria == null || serial_carroceria == undefined || serial_carroceria == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo serial_carroceria es requerido.'
      });          
   }

   if(!serial_motor || serial_motor == null || serial_motor == undefined || serial_motor == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo serial_motor es requerido.'
      });          
   }
   
   if(!marcaid || marcaid == null || marcaid == undefined || marcaid == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo marcaid es requerido.'
      });          
   }
   
   if(!modeloid || modeloid == null || modeloid == undefined || modeloid == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo modeloid es requerido.'
      });          
   }

   if(!colorid || colorid == null || colorid == undefined || colorid == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo colorid es requerido.'
      });          
   }

   if(!anno || anno == null || anno == undefined || anno == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo anno es requerido.'
      });          
   }

   if(!puestos || puestos == null || puestos == undefined || puestos == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo puestos es requerido.'
      });          
   }
   
   if(!intt_nro || intt_nro == null || intt_nro == undefined || intt_nro == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo intt_nro es requerido.'
      });          
   }
   if(!nro_autorizacion || nro_autorizacion == null || nro_autorizacion == undefined || nro_autorizacion == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_autorizacion es requerido.'
      });          
   }
   
   if(!fecha_emision_intt || fecha_emision_intt == null || fecha_emision_intt == undefined || fecha_emision_intt == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo fecha_emision_intt es requerido.'
      });          
   }

   if(!empresa_seguro || empresa_seguro == null || empresa_seguro == undefined || empresa_seguro == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo empresa_seguro es requerido.'
      });          
   }
   if(!nro_poliza || nro_poliza == null || nro_poliza == undefined || nro_poliza == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_poliza es requerido.'
      });          
   }
   if(!nro_sudeaseg || nro_sudeaseg == null || nro_sudeaseg == undefined || nro_sudeaseg == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_sudeaseg es requerido.'
      });          
   }

   if(!fecha_emision_poliza || fecha_emision_poliza == null || fecha_emision_poliza == undefined || fecha_emision_poliza == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo fecha_emision_poliza es requerido.'
      });          
   }

   if(!fecha_venc_poliza || fecha_venc_poliza == null || fecha_venc_poliza == undefined || fecha_venc_poliza == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo fecha_venc_poliza es requerido.'
      });          
   }
   var imgs = Object();  let img_certificado_path = ""; let img_poliza_path =""; 
   imgs = req.files;  
   if(imgs != undefined && imgs !== null && imgs){ 
      if(imgs['img_certificado'] != undefined && imgs['img_certificado'] !== null && imgs['img_certificado']){          
         img_certificado_path  = imgs['img_certificado']?.[0].path ?? "";
      }else{
         img_certificado_path = "";
      }    
      if(imgs['img_poliza'] != undefined && imgs['img_poliza'] !== null && imgs['img_poliza']){          
         img_poliza_path  = imgs['img_poliza']?.[0].path ?? "";
      }else{
         img_poliza_path = "";
      }              
   }else{
      img_certificado_path = "";
      img_poliza_path = "";      
   } 
   
   const newVehiculo = new Vehiculo({       
      userid: userid, 
      nro_certificado_registro, 
      placa,
      serial_niv, 
      serial_chasis,
      serial_carroceria, 
      serial_motor, 
      marcaid, 
      modeloid, 
      colorid, 
      anno, 
      clase,
      tipo, 
      uso, 
      servicio, 
      puestos, 
      intt_nro, 
      fecha_emision_intt,   
      nro_autorizacion,       
      empresa_seguro, 
      nro_poliza,
      nro_sudeaseg, 
      fecha_emision_poliza, 
      fecha_venc_poliza,
      img_certificado: img_certificado_path,
      img_poliza: img_poliza_path                  
   });

   try {      
      await newVehiculo.save();
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: newVehiculo,         
         num_status:httpCode[201].code,
         msg_status: 'Vehiculo creado satisfactoriamente.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (vehículos). '+error        
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
            msg_status: 'El Id no es válido'
         });
      }
      const { nro_certificado_registro,placa,serial_niv,serial_chasis,serial_carroceria, 
         serial_motor,marcaid,modeloid,colorid,anno,clase,tipo,uso,servicio,puestos, 
         intt_nro,fecha_emision_intt,nro_autorizacion,empresa_seguro,nro_poliza,
         nro_sudeaseg,fecha_emision_poliza,fecha_venc_poliza } = req.body

      if(!nro_certificado_registro || nro_certificado_registro == null || nro_certificado_registro == undefined || nro_certificado_registro == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_certificado_registro es requerido.'
         });          
      }   
          
      if(!placa || placa == null || placa == undefined || placa == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo placa es requerido.'
         });          
      }
      if(!serial_niv || serial_niv == null || serial_niv == undefined || serial_niv == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo serial_niv es requerido.'
         });          
      }
      if(!serial_chasis || serial_chasis == null || serial_chasis == undefined || serial_chasis == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo serial_chasis es requerido.'
         });          
      }

      if(!serial_carroceria || serial_carroceria == null || serial_carroceria == undefined || serial_carroceria == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo serial_carroceria es requerido.'
         });          
      }

      if(!serial_motor || serial_motor == null || serial_motor == undefined || serial_motor == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo serial_motor es requerido.'
         });          
      }
      
      if(!marcaid || marcaid == null || marcaid == undefined || marcaid == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo marcaid es requerido.'
         });          
      }
      
      if(!modeloid || modeloid == null || modeloid == undefined || modeloid == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo modeloid es requerido.'
         });          
      }

      if(!colorid || colorid == null || colorid == undefined || colorid == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo colorid es requerido.'
         });          
      }

      if(!anno || anno == null || anno == undefined || anno == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo anno es requerido.'
         });          
      }

      if(!puestos || puestos == null || puestos == undefined || puestos == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo puestos es requerido.'
         });          
      }
      
      if(!intt_nro || intt_nro == null || intt_nro == undefined || intt_nro == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo intt_nro es requerido.'
         });          
      }
      if(!nro_autorizacion || nro_autorizacion == null || nro_autorizacion == undefined || nro_autorizacion == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_autorizacion es requerido.'
         });          
      }
      
      if(!fecha_emision_intt || fecha_emision_intt == null || fecha_emision_intt == undefined || fecha_emision_intt == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo fecha_emision_intt es requerido.'
         });          
      }

      if(!empresa_seguro || empresa_seguro == null || empresa_seguro == undefined || empresa_seguro == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo empresa_seguro es requerido.'
         });          
      }
      if(!nro_poliza || nro_poliza == null || nro_poliza == undefined || nro_poliza == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_poliza es requerido.'
         });          
      }
      if(!nro_sudeaseg || nro_sudeaseg == null || nro_sudeaseg == undefined || nro_sudeaseg == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_sudeaseg es requerido.'
         });          
      }

      if(!fecha_emision_poliza || fecha_emision_poliza == null || fecha_emision_poliza == undefined || fecha_emision_poliza == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo fecha_emision_poliza es requerido.'
         });          
      }

      if(!fecha_venc_poliza || fecha_venc_poliza == null || fecha_venc_poliza == undefined || fecha_venc_poliza == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo fecha_venc_poliza es requerido.'
         });          
      }

      const data = await Vehiculo.findOne({_id: id});
      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Vehículo no encontrado.'
         });
      }
      var imgs = Object();  let img_certificado_path = ""; let img_poliza_path =""; 
      imgs = req.files; 
      
      if(imgs != undefined && imgs !== null && imgs){ 
         img_certificado_path  = imgs['img_certificado']?.[0].path ?? "";
                      
         if(img_certificado_path !== "" && img_certificado_path !== undefined && img_certificado_path !== null) {
            const storagePath = path.resolve(data.img_certificado);      
            if (fs.existsSync(storagePath)) {
               await fs.unlink(storagePath);            
            }
         }else{
            img_certificado_path = data.img_certificado;
         }  
         
         img_poliza_path  = imgs['img_poliza']?.[0].path ?? "";
                      
         if(img_poliza_path !== "" && img_poliza_path !== undefined && img_poliza_path !== null) {
            const storagePath = path.resolve(data.img_poliza);      
            if (fs.existsSync(storagePath)) {
               await fs.unlink(storagePath);            
            }
         }else{
            img_poliza_path = data.img_poliza;
         } 
                
      }else{
         img_certificado_path = data.img_certificado;
         img_poliza_path = data.img_poliza;      
      }  
     
      data.nro_certificado_registro    = nro_certificado_registro,
      data.placa                       = placa,
      data.serial_niv                  = serial_niv,
      data.serial_chasis               = serial_chasis,
      data.serial_carroceria           = serial_carroceria, 
      data.serial_motor                = serial_motor,
      data.marcaid                     = marcaid,
      data.modeloid                    = modeloid,
      data.colorid                     = colorid,
      data.anno                        = anno,
      data.clase                       = clase,
      data.tipo                        = tipo,
      data.uso                         = uso,
      data.servicio                    = servicio,
      data.puestos                     = puestos, 
      data.intt_nro                    = intt_nro,
      data.fecha_emision_intt          = fecha_emision_intt,
      data.nro_autorizacion            = nro_autorizacion,
      data.empresa_seguro              = empresa_seguro,
      data.nro_poliza                  = nro_poliza,
      data.nro_sudeaseg                = nro_sudeaseg,
      data.fecha_emision_poliza        = fecha_emision_poliza, 
      data.fecha_venc_poliza           = fecha_venc_poliza,
      data.img_certificado             = img_certificado_path,
      data.img_poliza                  = img_poliza_path

      await data.save();
       
      return res.status(httpCode[200].code).json({         
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Vehiculo updated successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (vehículos).'        
      });
   }
}

export const deleteVehiculo = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }      
      const data = await Vehiculo.findById(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Vehículo no encontrado.'
         });
      }
      
      data.activo = false;                  
      await data.save();

      return res.status(httpCode[200].code).json({
         data_send: {
            "placa": data.placa.toUpperCase(), 
            "modelo": data.modeloid, 
            "marca": data.marcaid, 
            "activo": data.activo           
         },
         num_status: httpCode[200].code,
         msg_status: 'Vehículo eliminado satisfactoriamente.'
      });
                  
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}

export const activarVehiculo = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }      
      const data = await Vehiculo.findById(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Vehículo no encontrado.'
         });
      }
      
      data.activo = true;                  
      await data.save();

      return res.status(httpCode[200].code).json({
         data_send: {
            "placa": data.placa.toUpperCase(), 
            "modelo": data.modeloid, 
            "marca": data.marcaid, 
            "activo": data.activo           
         },
         num_status: httpCode[200].code,
         msg_status: 'Vehículo activado satisfactoriamente.'
      });
                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (vehículos).'        
      });
   }
}
