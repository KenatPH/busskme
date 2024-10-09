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
import Reporte from "../models/reporteOperativo.models"
import {ObjectId} from 'mongodb';
import {httpCode}  from "../utils/httpStatusHandle";
import fs from 'fs-extra';
import path from 'path';
import utilsHandle from "../utils/utilsHandle";


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
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
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
   const data = await Vehiculo.find()
      .populate('userid choferid marcaid modeloid colorid', 'nombre color');
   ;
      
   try {
      if(data.length === 0){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
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

export const getDataVehiculosbyDriver = async (req: Request, res: Response): Promise<Response> => {

   const { id } = req.params;
   if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El Id no es válido'
      });
   }
   
   try {
      const data = await Vehiculo.find({ userid: id });
      if (data.length === 0) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Vehículos no encontrados.'
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
   
   const { choferid,nro_certificado_registro, placa,serial_niv, serial_chasis,
           serial_carroceria, serial_motor, marcaid, modeloid, colorid, anno, clase,
           tipo, uso, servicio, puestos, intt_nro, fecha_emision_intt,   
           nro_autorizacion, empresa_seguro, nro_poliza,
      nro_sudeaseg, fecha_emision_poliza, fecha_venc_poliza, codigo_unidad } = req?.body


   const userid = req.user
   
   if (!utilsHandle.validateFieldID(choferid)) {
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El campo choferid no es válido'
      });
   }
   if(!utilsHandle.validateFieldNum(nro_certificado_registro)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_certificado_registro es requerido.'
      });          
   }   
       
   if(!utilsHandle.validateFieldAlfaNum(placa)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo placa es requerido.'
      });          
   }
   if(!utilsHandle.validateFieldAlfaNum(serial_niv)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo serial_niv es requerido.'
      });          
   }
   if(!utilsHandle.validateFieldAlfaNum(serial_chasis)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo serial_chasis es requerido.'
      });          
   }

   if(!utilsHandle.validateFieldAlfaNum(serial_carroceria)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo serial_carroceria es requerido.'
      });          
   }

   if(!utilsHandle.validateFieldAlfaNum(serial_motor)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo serial_motor es requerido.'
      });          
   }
   
   if(!utilsHandle.validateFieldID(marcaid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo marcaid es requerido.'
      });          
   }
   
   if(!utilsHandle.validateFieldID(modeloid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo modeloid es requerido.'
      });          
   }

   if(!utilsHandle.validateFieldID(colorid)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo colorid es requerido.'
      });          
   }

   if(!utilsHandle.validateFieldNum(anno)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo anno es númerico y requerido.'
      });          
   }

   if(!utilsHandle.validateFieldNum(puestos)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo puestos es númerico y requerido.'
      });          
   }
   
   if(!utilsHandle.validateFieldAlfaNum(intt_nro)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo intt_nro es requerido.'
      });          
   }
   if(!utilsHandle.validateFieldAlfaNum(nro_autorizacion)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_autorizacion es requerido.'
      });          
   }
   
   if(!utilsHandle.validateFecha(fecha_emision_intt)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo fecha_emision_intt no tiene un formato válido (YYYY-MM-DD).'
      });          
   }

   if(!utilsHandle.validateFieldLetra(empresa_seguro)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo empresa_seguro es requerido.'
      });          
   }

   if(!utilsHandle.validateFieldAlfaNum(nro_poliza)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_poliza es requerido.'
      });          
   }
   if(!utilsHandle.validateFieldAlfaNum(nro_sudeaseg)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo nro_sudeaseg es requerido.'
      });          
   }

   if(!utilsHandle.validateFecha(fecha_emision_poliza)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo fecha_emision_poliza no tiene un formato válido (YYYY-MM-DD).'
      });          
   }

   if(!utilsHandle.validateFecha(fecha_venc_poliza)){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: httpCode[409].message+', El campo fecha_venc_poliza no tiene un formato válido (YYYY-MM-DD).'
      });          
   }

   if (tipo !=='taxi'){
      if (!codigo_unidad || codigo_unidad === null || codigo_unidad === "") {
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', El campo codigo unidad requerido.'
         });
      }
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
      choferid:choferid,
      nro_certificado_registro, 
      placa: placa.toUpperCase(), 
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
      img_poliza: img_poliza_path,
      codigo_unidad

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
      console.log(error);
      
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
      const {  choferid, nro_certificado_registro,placa,serial_niv,serial_chasis,serial_carroceria, 
         serial_motor,marcaid,modeloid,colorid,anno,clase,tipo,uso,servicio,puestos, 
         intt_nro,fecha_emision_intt,nro_autorizacion,empresa_seguro,nro_poliza,
         nro_sudeaseg, fecha_emision_poliza, fecha_venc_poliza, codigo_unidad } = req.body
      const userid:any = req.user
      // if(!utilsHandle.validateFieldID(userid)){
      //    return res.status(httpCode[409].code).json({
      //       data_send: "",
      //       num_status: httpCode[409].code,
      //       msg_status: 'El campo userid no es válido'
      //    });
      // }

      if (!utilsHandle.validateFieldID(choferid)) {
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El campo choferid no es válido'
         });
      }
      
      if(!utilsHandle.validateFieldNum(nro_certificado_registro)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_certificado_registro es requerido.'
         });          
      }   
            
      if(!utilsHandle.validateFieldAlfaNum(placa)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo placa es requerido.'
         });          
      }
      if(!utilsHandle.validateFieldAlfaNum(serial_niv)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo serial_niv es requerido.'
         });          
      }
      if(!utilsHandle.validateFieldAlfaNum(serial_chasis)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo serial_chasis es requerido.'
         });          
      }
   
      if(!utilsHandle.validateFieldAlfaNum(serial_carroceria)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo serial_carroceria es requerido.'
         });          
      }
   
      if(!utilsHandle.validateFieldAlfaNum(serial_motor)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo serial_motor es requerido.'
         });          
      }
      
      if(!utilsHandle.validateFieldID(marcaid)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo marcaid es requerido.'
         });          
      }
      
      if(!utilsHandle.validateFieldID(modeloid)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo modeloid es requerido.'
         });          
      }
   
      if(!utilsHandle.validateFieldID(colorid)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo colorid es requerido.'
         });          
      }
   
      if(!utilsHandle.validateFieldNum(anno)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo anno es númerico y requerido.'
         });          
      }
   
      if(!utilsHandle.validateFieldNum(puestos)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo puestos es númerico y requerido.'
         });          
      }
      
      if(!utilsHandle.validateFieldAlfaNum(intt_nro)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo intt_nro es requerido.'
         });          
      }
      if(!utilsHandle.validateFieldAlfaNum(nro_autorizacion)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_autorizacion es requerido.'
         });          
      }
      
      if(!utilsHandle.validateFecha(fecha_emision_intt)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo fecha_emision_intt no tiene un formato válido (YYYY-MM-DD).'
         });          
      }
   
      if(!utilsHandle.validateFieldLetra(empresa_seguro)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo empresa_seguro es requerido.'
         });          
      }
   
      if(!utilsHandle.validateFieldAlfaNum(nro_poliza)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_poliza es requerido.'
         });          
      }
      if(!utilsHandle.validateFieldAlfaNum(nro_sudeaseg)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo nro_sudeaseg es requerido.'
         });          
      }
   
      if(!utilsHandle.validateFecha(fecha_emision_poliza)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo fecha_emision_poliza no tiene un formato válido (YYYY-MM-DD).'
         });          
      }
   
      if(!utilsHandle.validateFecha(fecha_venc_poliza)){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: httpCode[409].message+', El campo fecha_venc_poliza no tiene un formato válido (YYYY-MM-DD).'
         });          
      }

      if (!codigo_unidad || codigo_unidad === null || codigo_unidad===""){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', El campo codigo unidad requerido.'
         });          
      }

      const data = await Vehiculo.findOne({_id: id});
      if (!data) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
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

      console.log(data.choferid != choferid);
      
      
      if (data.choferid != choferid){
         const choferAnterior = data.choferid;
   
         const reporte = new Reporte({
            vehiculoid: data._id,
            choferAnterior: choferAnterior,
            choferNuevo: choferid
         });
   
         await reporte.save();
      }


      data.userid                      = userid,    
      data.choferid                    = choferid,   
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
      data.codigo_unidad               = codigo_unidad

      await data.save();
       
      return res.status(httpCode[200].code).json({         
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Vehiculo actualizado con exito'
      });
   } catch (error) {
      console.log(error);
      
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
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
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
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
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
