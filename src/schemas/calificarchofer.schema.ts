/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de calificar chofer
  Fecha creación  : 25 de Jun del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const calificarChoferSchema = new Schema ({
   userid: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   choferid: {
      type: Schema.Types.ObjectId,
      ref: 'Chofer'
    },
   comentario: {
      type: String,      
   },
   calificacion: {
      type: Number,
      default:1
   },
   activo: {
      type: Boolean,
      default:true
   }     
},{versionKey: false, timestamps: true}
);
