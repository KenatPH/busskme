/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de roles
  Fecha creación  : 17 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import Role from "../models/role.models";
import mongoose from "mongoose";
import { roleSchema } from "../schemas/role.schema";
import {ObjectId} from 'mongodb';
import  {httpCode}  from "../utils/httpStatusHandle";


//mostrar un role por su id
export const getRole = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   const role = await Role.findOne({_id: id});
   //validamos que exista la información
   try {
      if(!role){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No Role found'
         });
      }
      return res.status(200).json({
         data_send: role,
         num_status: 0,
         msg_status: 'Role found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later '+error         
      })
   }
   
}

//mostrar todos los roles
export const getDataRoles = async (req: Request, res: Response): Promise<Response> => {
   const per = await Role.find();
   
   //validamos que exista la información
   try {
      if(per.length === 0){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No role found'
         });
      }
      return res.status(200).json({
         data_send: per,
         num_status: 0,
         msg_status: 'Roles found successfully!!!'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem with the server, try again later (categoria)'         
      })
   }
   
}

//crear un perfil
export const create = async (req: Request, res: Response): Promise<Response> => {
   //declaramos los parametros recibidos en el req.body
   const { nombre } = req?.body      
   
   const rol = await Role.findOne({nombre: nombre});

   if(rol){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'The rol already exists!'         
      });
   }

   const newRole = new Role({      
      nombre: nombre.toLowerCase(),      
   });
   
   try {      
      await newRole.save();      
      return res.status(httpCode[201].code).json(
      {  
         data_send: newRole,         
         num_status:httpCode[201].code,
         msg_status: 'Role created successfully.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '         
      });
   }
}

//modificar datos de un perfil
export const update = async (req: Request, res: Response): Promise<Response> => {
   try {            
      const { nombre, activo} = req.body;
      const id = req.params.id;            
      const updrol = await Role.findOneAndUpdate({_id: id}, 
         {$set: {
            nombre   : nombre.toLowerCase(),                        
            activo   : activo 
         }}, 
         {new: true});
      if(!updrol) {
        return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Role not found'
        });
      }
      return res.status(201).json({
         data_send: {
            updrol            
         },
         num_status: 0,
         msg_status: 'Role updated successfully'
      });                              
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem trying to modify the route, try again later (ruta)'+error         
      })
   }
}

export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
   try {
      
      // Find the perfil by id and Delete the perfil cambiando activo a false           
      const { activo} = req.body;
      const id = req.params.id;            
      const updrut = await Role.findOneAndUpdate({_id: id}, 
         {$set: {            
            activo   : activo,
            updateAt : Date.now()
         }}, 
         {new: true}
      );
      if(!updrut) {
        return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Role not found'
        });
      }
      return res.status(201).json({
         data_send: {
            updrut            
         },
         num_status: 0,
         msg_status: 'Role deleted successfully'
      });                              
                        
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}
