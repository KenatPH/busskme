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
import Estado from "../models/estados.models";


//mostrar estados que pertenecen a un país por su codigo de país (pais=VE o paisid)


//mostrar un estado por su id de estado (_id)
export const getEstado = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   const edo = await Estado.findById(id);
   //validamos que exista la información
   try {
      if(!edo){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No country found'
         });
      }
      return res.status(200).json({
         data_send: edo,
         num_status: 0,
         msg_status: 'Countries found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later '+error         
      })
   }   
}

//mostrar todos los estados 
export const getDataEdos = async (req: Request, res: Response): Promise<Response> => {
   const edo = await Estado.find().populate('pais','nombre');
   
   //validamos que exista la información
   try {
      if(edo.length === 0){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No state found'
         });
      }
      return res.status(200).json({
         data_send: edo,
         num_status: 0,
         msg_status: 'States found successfully!!!'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem with the server, try again later (estado)'+error         
      })
   }   
}

//mostrar un estado por el id de pais
export const getEstadosPais = async (req: Request, res: Response): Promise<Response> => {
   const { paisid } = req.body; 
   console.log("paisd: ",paisid);
   if(!paisid || paisid === undefined){
      return res.status(404).json({
         data_send: "",
         num_status: 9,
         msg_status: 'paisid is invalid'
      });
   }
   //buscamos si existe una ciudad con esos id de país y estado
   const edo = await Estado.find({paisid: paisid});
   
   //validamos que exista la información
   try {
      if(!edo){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'There is no state for the country sent'
         });
      }
      return res.status(200).json({
         data_send: edo,
         num_status: 0,
         msg_status: 'States found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later (estado control)'         
      })
   }   
}


export const create = async (req: Request, res: Response): Promise<Response> => {
   //declaramos los parametros recibidos en el req.body
   const { pais, estado, nombre,  paisid } = req?.body

   //validar el origen para saber si viene de local
   if(!pais || !nombre ){
      return res.status(409).json({
         data_send: "",         
         num_status:12,
         msg_status: 'Los campos pais, nombre, son obligatorios (estado)'
      })
   }

   //verificar si ya existe un estado  con ése nombre y el pais
   const edo = await Estado.findOne({pais: pais.toUpperCase(), nombre: nombre.toUpperCase()})
   if(edo) {
      return res.status(409).json({
         data_send: "",         
         num_status:2,
         msg_status: 'the state is already added to this country!'         
      })
   }
      
   const newEdo = new Estado({
      pais: pais.toUpperCase(),
      paisid: paisid,
      estado: estado.toUpperCase(), 
      nombre: nombre.toUpperCase()             
   });

   try {
      
      await newEdo.save();
      
      return res.status(201).json(
      {  
         data_send: newEdo,         
         num_status:0,
         msg_status: 'State created successfully.'
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
      const { pais, paisid, estado, nombre } = req.body;

      // Find the pais by Id
      const edo = await Estado.findById(id);

      if (!edo) {
         return res.status(404).json({
            data_send: "",
            num_status: 15,
            msg_status: 'State not found'
         });
      }

      // Update the estado properties
      edo.paisid = paisid,
      edo.nombre = nombre.toUpperCase();      
      edo.estado = estado.toUpperCase();            
      edo.pais = pais.toUpperCase();
      
      // Save the updated pais
      await edo.save();

      return res.status(200).json({
         data_send: {"pais": edo.pais.toUpperCase(),
                     "nombre": edo.nombre.toUpperCase(),
                     "estado": edo.estado.toUpperCase(),                     
         },
         num_status: 0,
         msg_status: 'State updated successfully'
      });
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}

export const deleteEstado = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      // Find the state by id and Delete the state            
      const updedo = await Estado.findOneAndUpdate({_id: id},         
         {$set: {            
            activo   : false,
            updateAt : Date.now()
         }}, 
         {new: true}
      );                    
      if(!updedo) {
        return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'State not found'
        });
      }
      if(updedo.activo === false){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'State already deleted'
         });
      }  
      return res.status(200).json({
         data_send:"",
         num_status: 0,
         msg_status: 'State deleted successfully'
      });
                        
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}
