/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de usuarios-choferes
  Fecha creación  : 27 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import User from "../models/users.models";
import Role from "../models/role.models";
import Chofer from "../models/chofer.models";
import Calificar from "../models/calificarchofer.models";
import  utilsHandle  from "../utils/utilsHandle";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";
import config from "../config/config";



export const getDataCalificarChofer = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(!utilsHandle.validateFieldID(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id no es válido'
      });
   }
   const data = await Calificar.findById(id)
   .populate('userid','nombre fecha_nacimiento dni telefono correo direccion idioma fotoperfil');
   
   try {
      if(!data){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Calificación de Chofer no encontrada.'
         });
      }      
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Calificación de Chofer encontrada satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (chofer)'         
      });
   }   
}
export const getCalificarChoferByUserId = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
    if(!utilsHandle.validateFieldID(id)){
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id no es válido'
        });
    }
   const data = await Calificar.findOne({userid:id})
   .populate('userid','nombre genero fecha_nacimiento dni telefono correo direccion idioma fotoperfil');
   
   try {
      if(!data){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Chofer no encontrado.'
         });
      }      
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Chofer encontrado satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (chofer)'         
      });
   }   
}

export const getCalificarChoferByChoferId = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params; 
    if(!utilsHandle.validateFieldID(id)){
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id no es válido'
        });
    }
    const data = await Calificar.findOne({choferid:id})
    .populate('userid','nombre genero fecha_nacimiento dni telefono correo direccion idioma fotoperfil');
    
    try {
       if(!data){
          return res.status(httpCode[204].code).json({
             data_send: "",
             num_status: httpCode[204].code,
             msg_status: 'Chofer no encontrado.'
          });
       }      
       return res.status(httpCode[200].code).json({
          data_send: data,
          num_status: httpCode[200].code,
          msg_status: 'Chofer encontrado satisfactoriamente'
       });
    } catch (error) {
       return res.status(httpCode[500].code).json({
          data_send: "",
          num_status: httpCode[500].code,
          msg_status: 'There was a problem with the server, try again later (chofer)'         
       });
    }   
 }


export const getDataCalificarChoferes = async (req: Request, res: Response): Promise<Response> => {
   const data = await Calificar.find()
   .populate('userid','nombre fecha_nacimiento dni telefono correo direccion idioma fotoperfil');
      
   try {
      if(data.length === 0){
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Chofer no encontrado.'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: data,
         num_status: httpCode[200].code,
         msg_status: 'Chofer encontrado satisfactoriamente'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (chofer)'         
      });
   }   
}


export const create = async (req: Request, res: Response): Promise<Response> => {
   
   const { userid,choferid,comentario,calificacion} = req?.body
   
   if(!utilsHandle.validateFieldID(userid)){
        return res.status(httpCode[409].code).json({
        data_send: "",         
        num_status:httpCode[409].code,
        msg_status: 'User Id no es válido'         
        });
   }

   if(!utilsHandle.validateFieldID(choferid)){
        return res.status(httpCode[409].code).json({
        data_send: "",         
        num_status:httpCode[409].code,
        msg_status: 'Chofer Id no es válido'         
        });
   }

   if(!utilsHandle.validateFieldNum(calificacion)){
        return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'La calificación debe ser númerica, es requerida.'         
        });
   }
                
   
   const newCalif = new Calificar({
      userid:userid,
      choferid:choferid,
      comentario:comentario,
      calificacion:calificacion                  
   });
      
   try {
      
      await newCalif.save();
      
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: {            
            newCalif
         },         
         num_status:httpCode[201].code,
         msg_status: httpCode[600].es
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (calificar-chofer).'         
      });
   }
}


export const update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if(!utilsHandle.validateFieldID(id)){
       return res.status(httpCode[409].code).json({
          data_send: "",
          num_status: httpCode[409].code,
          msg_status: 'Id is invalid'
       });
    }
    const { userid,choferid,comentario,calificacion} = req?.body
   
    if(!utilsHandle.validateFieldID(userid)){
         return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'User Id no es válido'         
         });
    }
 
    if(!utilsHandle.validateFieldID(choferid)){
         return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'Chofer Id no es válido'         
         });
    }
 
    if(!utilsHandle.validateFieldNum(calificacion)){
         return res.status(httpCode[409].code).json({
             data_send: "",         
             num_status:httpCode[409].code,
             msg_status: 'La calificación debe ser númerica, es requerida.'         
         });
    }
   
    const calif = await Calificar.findById(id);
    if (!calif) {
        return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'Calificar Chofer no existe.'
        });
    }
   
    calif.userid            = userid,
    calif.choferid          = choferid,
    calif.comentario        = comentario,
    calif.calificacion      = calificacion 

   
   
   
   try {
      
      await calif.save();            
     

      
      return res.status(httpCode[201].code).json(
      {  
         data_send: {            
           calif
         },         
         num_status:httpCode[201].code,
         msg_status: httpCode[600]+'.'+config.IDIOMA
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later (calificar-chofer).'         
      });
   }
}

export const deleteCalificarChofer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      if(!utilsHandle.validateFieldID(id)){
        return res.status(httpCode[409].code).json({
           data_send: "",
           num_status: httpCode[409].code,
           msg_status: 'Id is invalid'
        });
      }
    const calif = await Calificar.findById(id);

    if (!calif) {
        return res.status(httpCode[204].code).json({
        data_send: "",
        num_status: httpCode[204].code,
        msg_status: 'Calificar Chofer no encontrado.'
        });
    }
    calif.activo = false;  
    await calif.save();
    return res.status(httpCode[200].code).json({
        data_send:"",
        num_status: httpCode[200].code,
        msg_status: 'Chofer eliminado con éxito.'
    });                        
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }
}

export const activarCalificarChofer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
  
        if(!utilsHandle.validateFieldID(id)){
          return res.status(httpCode[409].code).json({
             data_send: "",
             num_status: httpCode[409].code,
             msg_status: 'Id is invalid'
          });
        }
      const calif = await Calificar.findById(id);
  
      if (!calif) {
          return res.status(httpCode[204].code).json({
          data_send: "",
          num_status: httpCode[204].code,
          msg_status: 'Calificar Chofer no encontrado.'
          });
      }
      calif.activo = true;  
      await calif.save();
      return res.status(httpCode[200].code).json({
          data_send:"",
          num_status: httpCode[200].code,
          msg_status: 'Chofer eliminado con éxito.'
      });                        
     } catch (error) {
        return res.status(httpCode[500].code).json({
           data_send: "",
           num_status: httpCode[500].code,
           msg_status: 'There was a problem with the server, try again later '         
        });
     }
}

