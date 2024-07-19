/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de colores de vehículos
  Fecha creación  : 30 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import Color from "../models/vehiculos/color.models";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";


export const getColor = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El Id no es válido'
      });
   }
   const data = await Color.findById(id);
   
   try {
      if(!data){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Color no enconttrado'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Color encontrado satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }   
}


export const getColores = async (req: Request, res: Response): Promise<Response> => {
   const data = await Color.find();
      
   try {
      if(data.length === 0){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'No existen datos de colores.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Colores encontrados satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (color vehículo).'         
      });
   }   
}


export const create = async (req: Request, res: Response): Promise<Response> => {

   const { color } = req?.body      
   if(!color || color == null || color == ""){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El color, es obligatorio.'
      })
   }
   
   
   const data = await Color.findOne({color: color.toUpperCase()})
   if(data) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El nombre del color, ya existe.'
      });
   }
      
   const newColor = new Color({           
      color: color.toUpperCase(),          
   })

   try {
      
      await newColor.save();
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: newColor,         
         num_status:httpCode[201].code,
         msg_status: 'Color creado satisfactoriamente.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (color vehículo).'         
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
      const { color } = req.body;
      if(!color || color == null || color == ""){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El color, es obligatorio.'
         })
      }
      const data = await Color.findById(id);

      if (!data) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Color no enconttrado'
         });
      }
      
      
      data.color = color.toUpperCase();                              
      await data.save();

      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Color modificado satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (color vehículo).'         
      });
   }
}

export const deleteColor = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }
      const data = await Color.findById(id);

      if (!data) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Color no enconttrado'
         });
      }else{         
         data.activo = false;      
         
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Color eliminado satisfactoriamente.'
         });
      }
                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (color vehículo).'         
      });
   }
}

export const activarColor = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }
      const data = await Color.findById(id);

      if (!data) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Color no enconttrado'
         });
      }else{         
         data.activo = true;      
         
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Color activado satisfactoriamente.'
         });
      }
                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (color vehículo).'         
      });
   }
}

