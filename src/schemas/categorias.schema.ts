/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de rutas
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const categoriaSchema = new Schema ({   
   nombre: {
      type: String,
      required: true
   },  
   genero: {
      type: String,      
   },
   edad_min:{
      type: Number,
      default: 0
   },   
   edad_max: {
      type: Number,
      default: 0
   },  
   activo: {
      type: Number,
      default:1
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   updateAt: {
      type: Date,
      default: Date.now
   }   
});
