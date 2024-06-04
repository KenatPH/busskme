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
    var imgs = Object();          
    imgs = req.files;  
    if(imgs != undefined && imgs !== null && imgs){      
       var img_certificado_path = imgs['img_certificado'][0].path !== "" ? imgs['img_certificado'][0].path : "";
       var img_poliza_path = imgs['img_poliza'][0].path !== "" ? imgs['img_poliza'][0].path : "";       
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
      const {   
         nro_certificado_registro,placa,serial_niv,serial_chasis,serial_carroceria, 
         serial_motor,marcaid,modeloid,colorid,anno,clase,tipo,uso,servicio,puestos, 
         intt_nro,fecha_emision_intt,nro_autorizacion,empresa_seguro,nro_poliza,
         nro_sudeaseg,fecha_emision_poliza,fecha_venc_poliza,img_certificado,img_poliza } = req.body

      var imgs = Object();  
      imgs = req.files;  
      if(imgs != undefined && imgs !== null && imgs){      
         var img_certificado_path = imgs['img_certificado'][0].path !== "" ? imgs['img_certificado'][0].path : "";
         var img_poliza_path = imgs['img_poliza'][0].path !== "" ? imgs['img_poliza'][0].path : "";       
      }  
      const data = await Vehiculo.findOne({_id: id});

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Vehículo no encontrado.'
         });
      }

      if(img_poliza !== null && img_poliza !== undefined && img_poliza !== ""){
         const storagePath = path.resolve(img_poliza);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }

      if(img_certificado !== null && img_certificado !== undefined && img_certificado !== ""){
         const storagePath = path.resolve(img_certificado);      
         if (fs.existsSync(storagePath)) {
            await fs.unlink(storagePath);            
         }
      }
      
      data.nro_certificado_registro,
      data.placa,
      data.serial_niv,
      data.serial_chasis,
      data.serial_carroceria, 
      data.serial_motor,
      data.marcaid,
      data.modeloid,
      data.colorid,
      data.anno,
      data.clase,
      data.tipo,
      data.uso,
      data.servicio,
      data.puestos, 
      data.intt_nro,
      data.fecha_emision_intt,
      data.nro_autorizacion,
      data.empresa_seguro,
      data.nro_poliza,
      data.nro_sudeaseg,
      data.fecha_emision_poliza,
      data.fecha_venc_poliza,
      data.img_certificado = img_certificado_path,
      data.img_poliza = img_poliza_path

      await data.save();
       
      return res.status(httpCode[200].code).json({         
         data_send: {            
            "Placa vehículo": data.placa,
            "Marca vehículo:": data.marcaid,                      
         },
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
