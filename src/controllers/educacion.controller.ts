/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para crud de categorías
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import express, { Request, Response } from "express";
import Educacion from "../models/educacion.models";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";

export const getEducacion = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id no es válido'
      });
   }
   const data = await Educacion.findById(id);
   
   try {
      if(!data){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Tipo de educación no encontrada.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Educación encontrada satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (educación)'         
      });
   }
   
}

export const getDataEducacion = async (req: Request, res: Response): Promise<Response> => {
   const data = await Educacion.find();
      
   try {
      if(data.length === 0){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Tipo de educación no encontrada.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Educación encontrada satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (educación)'         
      });
   }   
}

export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const { nombre } = req?.body
         
   const data = await Educacion.findOne({nombre: nombre.toUpperCase()})
   if(data) {
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Educación ya existe.'
      });
   }
      
   const newEduc = new Educacion({      
      nombre: nombre.toUpperCase(),          
   });

   try {
      
      await newEduc.save();
      
      return res.status(httpCode[201].code).json({
         data_send: newEduc,
         num_status: httpCode[201].code,
         msg_status: 'Educación creada satisfactoriamente'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (educación)'         
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
      const { nombre } = req.body;
      
      const data = await Educacion.findById(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Tipo de educación no encontrada.'
         });
      }      
      data.nombre = nombre.toUpperCase();                  
      await data.save();
      return res.status(httpCode[200].code).json({
         data_send:  {                  
            "educación": data.nombre.toUpperCase(), 
            "activo": data.activo,                  
         },
         num_status: httpCode[200].code,
         msg_status: 'Educación modificada satisfactoriamente'
      });      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (educación)'         
      });
   }
}

export const deleteEducacion = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id no es válido'
         });
      }
      
      const data = await Educacion.findByIdAndDelete(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Tipo de educación no encontrada.'
         });
      }else{
         data.activo = false;
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send: "",
            num_status: httpCode[200].code,
            msg_status: 'Educación eliminada satisfactoriamente'
         });
      }                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (educación)'         
      });
   }
}

export const activarEducacion = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id no es válido'
         });
      }
      
      const data = await Educacion.findByIdAndDelete(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Tipo de educación no encontrada.'
         });
      }else{
         data.activo = false;
         await data.save();
         return res.status(httpCode[200].code).json({
            data_send: "",
            num_status: httpCode[200].code,
            msg_status: 'Educación activada satisfactoriamente'
         });
      }                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (educación)'         
      });
   }
}

