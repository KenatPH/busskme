/*
  Empresa         : Bioonix
  Aplicación      : Api de Dominó
  Módulo          : Archivo para crud de jugadores
  Fecha creación  : 25 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Dominó
*/

import express, { Request, Response } from "express";
import Vehiculo from "../models/vehiculos/vehiculo.models";

//mostrar un vehiculo por su id
export const getVehiculo = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   const veh = await Vehiculo.findById(id);
   //validamos que exista la información
   try {
      if(!veh){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No Vehiculo found'
         });
      }
      return res.status(200).json({
         data_send: veh,
         num_status: 0,
         msg_status: 'Vehiculo found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later '+error         
      })
   }   
}

//mostrar todos los vehiculos
export const getDataVehiculos = async (req: Request, res: Response): Promise<Response> => {
   const vh = await Vehiculo.find();
   
   //validamos que exista la información
   try {
      if(vh.length === 0){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No Vehiculos found'
         });
      }
      return res.status(200).json({
         data_send: vh,
         num_status: 0,
         msg_status: 'Vehiculos found successfully!!!'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem with the server, try again later (club)'+error         
      })
   }
   
}

//crear un vehiculo
export const create = async (req: Request, res: Response): Promise<Response> => {
   //declaramos los parametros recibidos en el req.body
   const { userid,nro_certificado_registro, placa,serial_niv, serial_chasis,
           serial_carroceria, serial_motor, marca, modelo, color, anno, clase,
           tipo, uso, servicio, puestos, intt_nro, fecha_emision_intt,   
           nro_autorizacion, img_certificado, empresa_seguro, nro_poliza,
           nro_sudeaseg, fecha_emision_poliza, fecha_venc_poliza, img_poliza,
    } = req?.body
   
   //validaciones de campos en vehiculo.validator.ts          
   const newVehiculo = new Vehiculo({       
      userid: userid, 
      placa, 
      marca: marca.toUpperCase(), 
      modelo: modelo.toUppreCase(), 
      color: color.toUpperCase(), 
      anno, 
      puestos, 
      //certificado: certificado.toLowerCase(), 
      //foto_vehiculo: foto_vehiculo.toLowerCase()     
   });

   try {      
      await newVehiculo.save();
      
      return res.status(201).json(
      {  
         data_send: newVehiculo,         
         num_status:0,
         msg_status: 'Vehiculo created successfully.'
      });
      
   } catch (error) {
      return res.status(400).json({
         message: error
      })
   }
}


export const update = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      const {  placa, marca, modelo, color, anno, puestos, img_certificado, activo, aprobado } = req.body

      // Find the user by userId
      const vh = await Vehiculo.findOne({idcode: id});

      if (!vh) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Vehiculo not found'
         });
      }

      //Update the vehiculo properties      
      vh.placa          = placa.toUpperCase();
      vh.marca          = marca.toUpperCase();
      vh.modelo         = modelo.toUpperCase();
      vh.color          = color.toUpperCase();
      vh.anno           = anno;
      vh.puestos        = puestos;
      vh.img_certificado    = img_certificado.toLowerCase();      
      vh.activo         = activo;
      vh.aprobado       = aprobado

      // Save the updated vehiculo
      await vh.save();

      return res.status(200).json({         
         data_send: {            
            "placa": vh.placa.toUpperCase(),
            "marca": vh.marca,
            "modelo": vh.modelo,
            "color": vh.color.toUpperCase(),
            "anno": vh.anno,
            "puestos": vh.puestos,
            "certificado": vh.img_certificado.toLowerCase(),            
            "activo": vh.activo,
            "aprobado": vh.aprobado,
            "updateAt": Date.now()
         },
         num_status: 0,
         msg_status: 'Vehiculo updated successfully'
      });
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}

export const deleteVehiculo = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
            
      const vh = await Vehiculo.findById(id);

      if (!vh) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Vehiculo not exists'
         });
      }

      // Update the propertie activo 
      vh.activo = false;
                  
      // Save the delete vehiculo      
      await vh.save();

      return res.status(200).json({
         data_send: {
            "placa": vh.placa.toUpperCase(), 
            "modelo": vh.modelo, 
            "marca": vh.marca, 
            "activo": vh.activo           
         },
         num_status: 0,
         msg_status: 'Vehiculo delete successfully'
      });
                  
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}
