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


export const getModelo = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   const cat = await Modeloveh.findById(id);
   //validamos que exista la información
   try {
      if(!cat){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No Model found'
         });
      }
      return res.status(200).json({
         data_send: cat,
         num_status: 0,
         msg_status: 'Vehicle model found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later '+error         
      })
   }   
}


export const getModeloByMarcaid = async (req: Request, res: Response): Promise<Response> => {
   const { marcaid } = req.params; 
   const cat = await Modeloveh.find({marcaid: marcaid, activo: true});
   //validamos que exista la información
   try {
      if(!cat){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No Models found'
         });
      }
      return res.status(200).json({
         data_send: cat,
         num_status: 0,
         msg_status: 'Vehicle models found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later '         
      })
   }
   
}

//mostrar todos los modelos
export const getDataModelos = async (req: Request, res: Response): Promise<Response> => {
   const mod = await Modeloveh.find();
   
   //validamos que exista la información
   try {
      if(mod.length === 0){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No Vehicle model found'
         });
      }
      return res.status(200).json({
         data_send: mod,
         num_status: 0,
         msg_status: 'Models found successfully!!!'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem with the server, try again later (modeloveh)'         
      })
   }   
}

//crear un modelo de vehiculo
export const create = async (req: Request, res: Response): Promise<Response> => {
   //declaramos los parametros recibidos en el req.body
   const { marcaid, nombre } = req?.body
   
   //validar datos obligatorios
   if(!nombre || nombre == null || nombre == "" ||
      !marcaid || marcaid == null || marcaid == ""){
      return res.status(409).json({
         data_send: "",         
         num_status:12,
         msg_status: 'El nombre, es obligatorio (marca)'
      })
   }
   
   //verificar si ya existe una categoría con ése nombre
   const ca = await Modeloveh.findOne({nombre: nombre.toUpperCase()})
   if(ca) {
      return res.status(409).json({
         data_send: "",         
         num_status:2,
         msg_status: 'The Marca already exists!'         
      })
   }
      
   const newMod = new Modeloveh({ 
      marcaid: marcaid,     
      nombre: nombre.toUpperCase(),          
   })

   try {
      
      await newMod.save();
      
      return res.status(201).json(
      {  
         data_send: newMod,         
         num_status:0,
         msg_status: 'Model created successfully.'
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
      const { marcaid, nombre, activo} = req.body;

      // Find the marca by Id
      const ve = await Modeloveh.findById(id).populate('Marcas', 'nombre');

      if (!ve) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Marca not found'
         });
      }
      //validar datos obligatorios
      if(!marcaid || marcaid == null || marcaid == "" 
      || !nombre || nombre == null || nombre == "" || !activo || activo == null){
         return res.status(409).json({
            data_send: "",         
            num_status:12,
            msg_status: 'El nombre y la marca son obligatorios (modeloveh)'
         })
      }
      // Update the category properties
      ve.nombre = nombre.toUpperCase();                  
      ve.activo = activo;
      //.populate('Marcas', 'nombre')
      // Save the updated modeloveh
      
      await ve.save();

      return res.status(200).json({
         data_send: {                  
                  /* "nombre": ve.nombre.toUpperCase(), 
                  "activo": ve.activo,  */       
                  ve          
         },
         num_status: 0,
         msg_status: 'Vehicle model updated successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem trying to modify the country, try again later (categoria)'+error         
      })
   }
}

export const deleteModeloVeh = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      // Find the model by id and Delete the vehicle model      
      
      const ve = await Modeloveh.findById(id);

      if (!ve) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Marca not found'
         });
      }else{         
         ve.activo = false;      
         // Save the updated category      
         await ve.save();
         return res.status(200).json({
            data_send:{
               "marca id": ve.marcaid,
               "modelo": ve.nombre,
               "activo": ve.activo
            },
            num_status: 0,
            msg_status: 'Vehicle model deleted successfully'
         });
      }
                  
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}
