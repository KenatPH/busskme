/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de rutas
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import Ruta from "../models/ruta.models";
import mongoose from "mongoose";
import { rutaSchema } from "../schemas/ruta.schema";
import { httpCode } from "../utils/httpStatusHandle";
import {ObjectId} from 'mongodb';



export const getRuta = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id is invalid'
      });
   }
   const rut = await Ruta.findOne({_id: id});
   
   try {
      if(!rut){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'No route found'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: rut,
         num_status: httpCode[200].code,
         msg_status: httpCode[200].message
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }   
}


export const getDataRutas = async (req: Request, res: Response): Promise<Response> => {
   const rutas = await Ruta.find();
      
   try {
      if(rutas.length === 0){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Ruta no encontrada'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: rutas,
         num_status: httpCode[200].code,
         msg_status: httpCode[200].message
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }
   
}

export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const { nombre, codigo, color} = req?.body            
   const newRuta = new Ruta({      
      codigo: codigo.toUpperCase(),
      nombre: nombre.toUpperCase(),
      color: color.toUpperCase()
   });
   if(!nombre || nombre === null || nombre =="" || nombre == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre es obligatorio, verifique.'         
      });
   } 
   if(!color || color === null || color =="" || color == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo color es obligatorio, verifique.'         
      });
   } 
   if(!codigo || codigo === null || codigo =="" || codigo == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo codigo es obligatorio, verifique.'         
      });
   }
   const data = await Ruta.findOne({codigo: codigo});
   if(data){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El código de la ruta ya existe, verifique.'         
      });
   } 

   try {
      
      await newRuta.save();
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: newRuta,         
         num_status:httpCode[201].code,
         msg_status: 'Ruta creada satisfactoriamente.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }
}

export const update = async (req: Request, res: Response): Promise<Response> => {
   try {            
      const { nombre, color, codigo} = req.body;
      const id = req.params.id;
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      } 
      if(!nombre || nombre === null || nombre =="" || nombre == undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo nombre es obligatorio, verifique.'         
         });
      } 
      if(!color || color === null || color =="" || color == undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo color es obligatorio, verifique.'         
         });
      } 
      if(!codigo || codigo === null || codigo =="" || codigo == undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo codigo es obligatorio, verifique.'         
         });
      }
      const data = await Ruta.findOne({ codigo: codigo, _id: { $ne: id } });
      if(data){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El código de la ruta ya existe, verifique.'         
         });
      }

      const updrut = await Ruta.findOneAndUpdate({_id: id}, 
         {$set: {
            nombre   : nombre.toUpperCase(),            
            color    : color.toUpperCase(),            
            codigo : codigo.toUpperCase() 
         }}, 
         {new: true});
      if(!updrut) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Ruta no encontrada.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: {
            updrut            
         },
         num_status: httpCode[200].code,
         msg_status: 'Ruta modificada con éxito.'
      });
                              
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem trying to modify the route, try again later (ruta)'         
      })
   }
}

export const deleteRuta = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      } 
      const rut = await Ruta.findById(id);
      if (!rut) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'No route found'
         });
      }      
      rut.activo = false;      
      await rut.save();

      return res.status(httpCode[200].code).json({
         data_send: {
            "color": rut.color.toUpperCase(), 
            "nombre": rut.nombre.toUpperCase(), 
            "activo": rut.activo,
            "aprobado": rut.aprobado             
         },
         num_status: httpCode[200].code,
         msg_status: 'Route delete successfully'
      });
                        
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem trying to modify the route, try again later (ruta)'         
      });
   }
}

export const activarRuta = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      } 
      const rut = await Ruta.findById(id);
      if (!rut) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'No route found'
         });
      }            
      rut.activo = true;           
      await rut.save();

      return res.status(httpCode[200].code).json({
         data_send: {
            "color": rut.color.toUpperCase(), 
            "nombre": rut.nombre.toUpperCase(), 
            "activo": rut.activo,
            "aprobado": rut.aprobado             
         },
         num_status: httpCode[200].code,
         msg_status: 'Ruta activada con éxito.'
      });
                        
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem trying to modify the route, try again later (ruta)'         
      });
   }
}
