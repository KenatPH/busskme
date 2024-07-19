/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de modelos de vehículos
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import Modeloveh from "../models/vehiculos/modeloveh.models";
import Marcas from "../models/vehiculos/marca.models";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";

export const getModelo = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El Id no es válido'
      });
   }
   const data = await Modeloveh.findById(id).
   populate('marcaid','nombre');
   
   try {
      if(!data){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Modelo no enconttrado'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Modelo encontrado satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }   
}


export const getModeloByMarcaid = async (req: Request, res: Response): Promise<Response> => {
   const { marcaid } = req.params;
   if(marcaid === null || marcaid === undefined || !marcaid || !ObjectId.isValid(marcaid)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El Id no es válido.'
      });
   } 
   const data = await Modeloveh.find({marcaid: marcaid, activo: true}).
   populate('marcaid','nombre');
   
   try {
      if(!data){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Modelo no enconttrado.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Modelo encontrado satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'         
      });
   }
   
}

export const getDataModelos = async (req: Request, res: Response): Promise<Response> => {
   const data = await Modeloveh.find().
   populate('marcaid','nombre');
   
   try {
      if(data.length === 0){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Modelos no enconttrados.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Modelos encontrados satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'         
      });
   }   
}

export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const { marcaid, nombre } = req?.body
      
   if(!nombre || nombre == null || nombre == "" ||
      !marcaid || marcaid == null || marcaid == ""||!ObjectId.isValid(marcaid)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El id no es válido, el nombre es obligatorio.'
         });
   }
   
   
   const data = await Modeloveh.findOne({nombre: nombre.toUpperCase()})
   if(data) {
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Ya existe un modelo con ése nombre.'
      });
   }
      
   const newMod = new Modeloveh({ 
      marcaid: marcaid,     
      nombre: nombre.toUpperCase(),          
   })

   try {
      
      await newMod.save();
      
      return res.status(httpCode[201].code).json({
         data_send: newMod,
         num_status: httpCode[201].code,
         msg_status: 'Modelo creado satisfactoriamente.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'         
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
      const { marcaid, nombre} = req.body;
      if(!nombre || nombre == null || nombre == "" ||
         !marcaid || marcaid == null || marcaid == "" || !ObjectId.isValid(marcaid)){
            return res.status(httpCode[409].code).json({
               data_send: "",
               num_status: httpCode[409].code,
               msg_status: 'El campo marcaid no es válido, el nombre es obligatorio.'
         });
      }
      
      const data = await Modeloveh.findById(id)
      .populate('marcaid', 'nombre');

      if (!data) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Modelo no enconttrados.'
         });
      }
      
      data.marcaid = marcaid,
      data.nombre = nombre.toUpperCase();                              
      await data.save();
      const upd = await Modeloveh.findById(id)
      .populate('marcaid', 'nombre');
      return res.status(httpCode[200].code).json({
         data_send: upd,
         num_status: httpCode[200].code,
         msg_status: 'Modelo modificado satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'+error         
      });
   }
}

export const deleteModeloVeh = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }
            
      const data = await Modeloveh.findById(id);

      if (!data) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Modelo no enconttrados.'
         });
      }else{         
         data.activo = false;      
         
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send:{
               "marca id": data.marcaid,
               "modelo": data.nombre,
               "activo": data.activo
            },
            num_status: httpCode[200].code,
            msg_status: 'Modelo de vehículo eliminado satisfactoriamente.'
         });
      }
                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'         
      });
   }
}

export const activarModeloVeh = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
         });
      }
            
      const data = await Modeloveh.findById(id);

      if (!data) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Modelo no enconttrados.'
         });
      }else{         
         data.activo = true;      
         
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send:{
               "marca id": data.marcaid,
               "modelo": data.nombre,
               "activo": data.activo
            },
            num_status: httpCode[200].code,
            msg_status: 'Modelo de vehículo activado satisfactoriamente.'
         });
      }
                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'         
      });
   }
}
