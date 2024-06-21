/*
  Empresa         : Bioonix
  Aplicación      : Api de Dominó
  Módulo          : Archivo para crud de estados
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Dominó
*/

import express, { Request, Response } from "express";
import Ciudad from "../models/ciudad.models";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";

export const getCiudad = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id is invalid'
      });
   }
   const ciu = await Ciudad.findById(id);
   
   try {
      if(!ciu){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'No city found'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: ciu,
         num_status: httpCode[200].code,
         msg_status: 'Cities found successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'
      })
   }   
}

//mostrar una ciudad por el id de pais, estado (_id)
export const getCiudadesPaisEdo = async (req: Request, res: Response): Promise<Response> => {
   const { paisid, estadoid, municipioid } = req?.body; 
   if(!paisid || !ObjectId.isValid(paisid) || paisid === undefined ||
   !estadoid || !ObjectId.isValid(estadoid) || estadoid === undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'paisid o estadoid no son correctos'
      });
   }
   const ciu = await Ciudad.find({paisid:paisid, estadoid:estadoid, municipioid:municipioid}).
   populate("paisid",'nombre').
   populate("estadoid",'nombre').
   populate("municipioid",'nombre');
   
   try {
      if(!ciu){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'There is no city for the country and state sent'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: ciu,
         num_status: httpCode[200].code,
         msg_status: 'Cities found successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'
      })
   }   
}


//mostrar todas las ciudades de un país y estado en particular
export const getDataCiudades = async (req: Request, res: Response): Promise<Response> => {
   const { paisid, estadoid } = req?.body; 
   console.log("datos recibidos: ",paisid,estadoid);
   const ciu = await Ciudad.paginate({paisid:paisid, estadoid:estadoid},{limit:1,page:1});
   
   //validamos que exista la información
   try {
      if(ciu.length === 0){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'No cities found'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: ciu,
         num_status: httpCode[200].code,
         msg_status: 'Cities found successfully!!!'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later.'
      })
   }   
}


export const create = async (req: Request, res: Response): Promise<Response> => {
   //declaramos los parametros recibidos en el req.body
   const { paisid, estadoid, nombre } = req?.body

   //validar datos obligatorios
   if(!paisid || !estadoid || !nombre ){
      return res.status(409).json({
         data_send: "",         
         num_status:12,
         msg_status: 'Los campos paisid, estadoid, nombre, son obligatorios (ciudad)'
      })
   }

   //verificar si ya existe una ciudad con ése nombre
   const ciu = await Ciudad.findOne({paisid: paisid, estadoid: estadoid, nombre: nombre.toUpperCase()})
   if(ciu) {
      return res.status(409).json({
         data_send: "",         
         num_status:2,
         msg_status: 'the cyty is already added to this country and state!'         
      })
   }
      
   const newCiu = new Ciudad({
      paisid,      
      estadoid,
      nombre: nombre.toUpperCase()
   });

   try {      
      await newCiu.save();      
      return res.status(201).json(
      {  
         data_send: newCiu,         
         num_status:0,
         msg_status: 'City created successfully.'
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
      const { paisid, estadoid, nombre } = req.body;

      // Find the city by Id
      const ciu = await Ciudad.findById(id);

      if (!ciu) {
         return res.status(404).json({
            data_send: "",
            num_status: 15,
            msg_status: 'City not found'
         });
      }

      // Update the city properties
      ciu.nombre = nombre.toUpperCase();      
      ciu.estadoid = estadoid;      
      ciu.paisid = paisid;
      
      // Save the updated pais
      await ciu.save();

      return res.status(200).json({
         data_send: {"paisid": ciu.paisid,
                     "estadoid": ciu.estadoid,
                     "nombre": ciu.nombre.toUpperCase(),                     
         },
         num_status: 0,
         msg_status: 'City updated successfully'
      });
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}

export const deleteCiudad = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;


      const ciu = await Ciudad.findOneAndUpdate({_id: id},         
         {$set: {            
            activo   : false,
            updateAt : Date.now()
         }}, 
         {new: true}
      );                    
      if(!ciu) {
        return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'State not found'
        });
      }
      if(ciu.activo === false){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'City already deleted'
         });
      } 
      return res.status(200).json({
         //data_send:user,
         num_status: 0,
         msg_status: 'City deleted successfully'
      });
      
                  
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}
