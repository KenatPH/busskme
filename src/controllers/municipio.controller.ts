/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de municipios
  Fecha creación  : 27 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import Municipio from "../models/municipio.models";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";

export const getMunicipio = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id is invalid'
      });
   }
   const data = await Municipio.findById(id);
   
   try {
      if(!data){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Municipio no encontrado.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Municipio encontrado satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }   
}

export const getMunicipiosPaisEdo = async (req: Request, res: Response): Promise<Response> => {
   const { paisid, estadoid } = req?.body; 
   if(!paisid || !ObjectId.isValid(paisid) || paisid === undefined ||
   !estadoid || !ObjectId.isValid(estadoid) || estadoid === undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'paisid o estadoid no son correctos'
      });
   }
   const data = await Municipio.find({paisid:paisid, estadoid:estadoid}).
   populate("paisid",'nombre').
   populate("estadoid",'nombre');
   
   try {
      if(!data){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'No hay municipios para éste país y estado'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Municipios encontrados satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'Hubo un problema con el servidor, intente más tarde.'         
      })
   }   
}


export const getDataMunicipios = async (req: Request, res: Response): Promise<Response> => {
   const { paisid, estadoid } = req?.body; 
   if(!paisid || !ObjectId.isValid(paisid) || paisid === undefined ||
   !estadoid || !ObjectId.isValid(estadoid) || estadoid === undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'paisid o estadoid no son correctos'
      });
   }
   const data = await Municipio.find({paisid:paisid, estadoid:estadoid});
      
   try {
      if(data.length === 0){
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Municipios no encontrados.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Municipios encontrados satisfactoriamente.'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (municipio)'         
      })
   }   
}


export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const { paisid, estadoid, nombre } = req?.body
   if(!paisid || !ObjectId.isValid(paisid) || paisid === undefined ||
   !estadoid || !ObjectId.isValid(estadoid) || estadoid === undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'paisid o estadoid no son correctos'
      });
   }
   //validar datos obligatorios
   if(!paisid || !estadoid || !nombre ){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'Los campos paisid, estadoid, nombre, son obligatorios (municipio)'
      })
   }
   
   const data = await Municipio.findOne({paisid: paisid, estadoid: estadoid, nombre: nombre.toUpperCase()})
   if(data) {
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El municipio ya ha sido agregado a éte estadop y país.'         
      })
   }
      
   const newMun = new Municipio({
      paisid,      
      estadoid,
      nombre: nombre.toUpperCase()
   });

   try {      
      await newMun.save();      
      return res.status(httpCode[201].code).json(
      {  
         data_send: newMun,         
         num_status:httpCode[201].code,
         msg_status: 'Municipio creado satisfactoriamente.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'Hubo un problema con el servidor, intente más tarde.'         
      })
   }
}


export const update = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      const { paisid, estadoid, nombre } = req.body;

      if(!paisid || !ObjectId.isValid(paisid) || paisid === undefined ||
      !estadoid || !ObjectId.isValid(estadoid) || estadoid === undefined ||
      !id || !ObjectId.isValid(id) || id === undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'id, paisid o estadoid no son correctos'
         });
      }
      
      const data = await Municipio.findById(id);

      if (!data) {
         return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Municipio no encontrado'
         });
      }
      
      data.nombre = nombre.toUpperCase();      
      data.estadoid = estadoid;      
      data.paisid = paisid;

      await data.save();

      return res.status(httpCode[200].code).json({
         data_send: {"Pais": data.paisid,
                     "Estado": data.estadoid,
                     "Municipio": data.nombre.toUpperCase(),                     
         },
         num_status: httpCode[200].code,
         msg_status: 'City updated successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'Hubo un problema con el servidor, intente más tarde.'         
      })
   }
}

export const deleteMunicipio = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      if(!id || !ObjectId.isValid(id) || id === undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'id, paisid o estadoid no son correctos'
         });
      }

      const data = await Municipio.findOneAndUpdate({_id: id},         
         {$set: {            
            activo   : false,
            updateAt : Date.now()
         }}, 
         {new: true}
      );                    
      if(!data) {
        return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Municipio no encontrado.'
        });
      }
      if(data.activo === false){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Municipio ya ha sido borrado'
         });
      } 
      return res.status(httpCode[200].code).json({
         data_send:"",
         num_status: httpCode[200].code,
         msg_status: 'Municipio borrado satisfactoriamente.'
      });
      
                  
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'Hubo un problema con el servidor, intente más tarde.'         
      });
   }
}
