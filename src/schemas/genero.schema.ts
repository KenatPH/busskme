/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para definir el schema de categorías
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Dominó
*/

import { Schema, Document } from "mongoose";

export const generoSchema = new Schema ({      
   genero: {
      type: String,
      required: true
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
