/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para crud de marcas
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import express, { Request, Response } from "express";
import Marcas from "../models/vehiculos/marca.models";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";

export const getMarca = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El Id no es válido'
      });
   }
   const data = await Marcas.findById(id);
   
   try {
      if(!data){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Marca no enconttrada'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Marca encontrada satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }   
}

export const getDataMarcas = async (req: Request, res: Response): Promise<Response> => {
   const data = await Marcas.find();
      
   try {
      if(data.length === 0){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Marca no enconttrada'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Marcas encontrada satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }   
}

export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const { nombre } = req?.body
      
   if(!nombre || nombre == null || nombre == "" ){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[204].code,
         msg_status: 'El nombre de la marca, es obligatorio.'
      })
   }
      
   const data = await Marcas.findOne({nombre: nombre.toUpperCase()})
   if(data) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'La Marca ya existse.'         
      })
   }
      
   const newMar = new Marcas({      
      nombre: nombre.toUpperCase(),          
   });

   try {
      
      await newMar.save();
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: newMar,         
         num_status:httpCode[201].code,
         msg_status: 'Marca creada satisfactoriamente.'
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
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }
      const { nombre } = req.body;
      
      const data = await Marcas.findById(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Marca no encontrada.'
         });
      }
      
      if(!nombre || nombre == null || nombre == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El nombre, es obligatorio (marca)'
         })
      }
            
      data.nombre = nombre.toUpperCase();            
      await data.save();

      return res.status(httpCode[200].code).json({
         data_send: {                  
                  "Marca": data.nombre.toUpperCase(), 
                  "activo": data.activo,                  
         },
         num_status: httpCode[200].code,
         msg_status: 'Marca modificada satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }
}

export const deleteMarca = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }
      
      const data = await Marcas.findById(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Marca no encontrada.'
         });
      }else{
         data.activo = false;      
         
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send:{
               "marca": data.nombre,
               "activo": data.activo
            },
            num_status: httpCode[200].code,
            msg_status: 'Marca borrada satisfactoriamente.'
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

export const activarMarca = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }
      
      const data = await Marcas.findById(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Marca no encontrada.'
         });
      }else{
         data.activo = true;      
         
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send:{
               "marca": data.nombre,
               "activo": data.activo
            },
            num_status: httpCode[200].code,
            msg_status: 'Marca activada satisfactoriamente.'
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
