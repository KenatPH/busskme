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
import Categorias from "../models/categoria.models";


//mostrar una categoria por su id
export const getCategoria = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   const cat = await Categorias.findById(id);
   //validamos que exista la información
   try {
      if(!cat){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No category found'
         });
      }
      return res.status(200).json({
         data_send: cat,
         num_status: 0,
         msg_status: 'Category found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later '+error         
      })
   }
   
}

//mostrar todas las categorías
export const getDataCategorias = async (req: Request, res: Response): Promise<Response> => {
   const categorias = await Categorias.find();
   
   //validamos que exista la información
   try {
      if(categorias.length === 0){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No category found'
         });
      }
      return res.status(200).json({
         data_send: categorias,
         num_status: 0,
         msg_status: 'Categories found successfully!!!'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem with the server, try again later (categoria)'+error         
      })
   }
   
}

//crear una categoría
export const create = async (req: Request, res: Response): Promise<Response> => {
   //declaramos los parametros recibidos en el req.body
   const { nombre, genero, edad_min, edad_max } = req?.body
      
   //verificar si ya existe una categoría con ése nombre
   const ca = await Categorias.findOne({nombre: nombre.toUpperCase()})
   if(ca) {
      return res.status(409).json({
         data_send: "",         
         num_status:2,
         msg_status: 'The category already exists!'         
      })
   }
      
   const newCat = new Categorias({
      genero,
      nombre: nombre.toUpperCase(),
      edad_min, 
      edad_max      
   });

   try {
      
      await newCat.save();
      
      return res.status(201).json(
      {  
         data_send: newCat,         
         num_status:0,
         msg_status: 'Category created successfully.'
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
      const { nombre, genero, edad_min, edad_max, activo} = req.body;

      // Find the category by Id
      const ca = await Categorias.findById(id);

      if (!ca) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Category not found'
         });
      }

      // Update the category properties
      ca.nombre = nombre.toUpperCase();            
      ca.genero = genero;
      ca.activo = activo.toLowerCase();
      ca.edad_min = edad_min;
      ca.edad_max = edad_max;
      
      // Save the updated category
      
      await ca.save();

      return res.status(200).json({
         data_send: {
                  "genero": ca.genero, 
                  "nombre": ca.nombre.toUpperCase(), 
                  "activo": ca.activo,
                  "edad_min": edad_min,
                  "edad_max": edad_max
         },
         num_status: 0,
         msg_status: 'Category updated successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem trying to modify the country, try again later (categoria)'+error         
      })
   }
}

export const deleteCategoria = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      // Find the category by id and Delete the category      
      const ca = await Categorias.findByIdAndDelete(id);

      if (!ca) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Category not found'
         });
      }else{
         return res.status(200).json({
            //data_send:user,
            num_status: 0,
            msg_status: 'Category deleted successfully'
         });
      }
                  
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}
