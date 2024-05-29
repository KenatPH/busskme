/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para crud de genero
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import express, { Request, Response } from "express";
import Genero from "../models/genero.models";


//mostrar un género por su id
export const getGenero = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   const gen = await Genero.findById(id);
   //validamos que exista la información
   try {
      if(!gen){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No gender found'
         });
      }
      return res.status(200).json({
         data_send: gen,
         num_status: 0,
         msg_status: 'Gender found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later '+error         
      })
   }
   
}

//mostrar todos los géneros
export const getDataGeneros = async (req: Request, res: Response): Promise<Response> => {
   const genero = await Genero.find();
   
   //validamos que exista la información
   try {
      if(genero.length === 0){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No gender found'
         });
      }
      return res.status(200).json({
         data_send: genero,
         num_status: 0,
         msg_status: 'Genero found successfully!!!'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem with the server, try again later (categoria)'+error         
      })
   }
   
}

//crear un género
export const create = async (req: Request, res: Response): Promise<Response> => {
   //declaramos los parametros recibidos en el req.body
   const { genero } = req?.body
      
   //verificar si ya existe un género con ésa descripción
   /* const ge = await Genero.findOne({genero: genero.toUpperCase()})
   if(ge) {
      return res.status(409).json({
         data_send: "",         
         num_status:2,
         msg_status: 'The gender already exists!'         
      })
   }
       */
   const newGen = new Genero({
      genero: genero.toUpperCase()      
   });

   try {      
      await newGen.save();      
      return res.status(201).json(
      {  
         data_send: newGen,         
         num_status:0,
         msg_status: 'Gender created successfully.'
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
      const { genero, activo} = req.body;

      // Find the category by Id 
      const ge = await Genero.findById(id);

      if (!ge) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Gender not found'
         });
      }

      // Update the género properties
      ge.genero = genero.toUpperCase();                  
      ge.activo = activo;         
      // Save the updated gender         
      await ge.save();
      return res.status(200).json({
         data_send: {
                  "genero": ge.genero.toUpperCase(),                   
                  "activo": ge.activo
         },
         num_status: 0,
         msg_status: 'Gender updated successfully'
      });         
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem trying to modify the country, try again later (categoria)'+error         
      })
   }
}

export const deleteGenero = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      // Find the category by id and Delete the category      
      const ge = await Genero.findByIdAndDelete(id);

      if (!ge) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Gender not found'
         });
      }else{
         return res.status(200).json({
            data_send:"",
            num_status: 0,
            msg_status: 'Gender deleted successfully'
         });
      }
                  
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}
