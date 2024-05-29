/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para definir el schema de ciudades
  Fecha creación  : 08 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import { Schema, Document } from "mongoose";

export const ciudadSchema = new Schema ({   
   paisid: {
      type: Schema.Types.ObjectId,
      ref: 'Pais'
    },
   estadoid: {
      type: Schema.Types.ObjectId,
      ref: 'Estado'
   },
   municipioid: {
      type: Schema.Types.ObjectId,
      ref: 'Municipio'
   },
   nombre: {
      type: String,
      required: true
   },         
   activo: {
      type: Boolean,
      default:true
   }    
   },{versionKey: false, timestamps: true}
);
