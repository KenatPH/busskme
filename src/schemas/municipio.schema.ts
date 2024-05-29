/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de municipios
  Fecha creación  : 27 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const municipioSchema = new Schema ({   
   paisid: {
      type: Schema.Types.ObjectId,
      ref: 'Pais'
    },
   estadoid: {
      type: Schema.Types.ObjectId,
      ref: 'Estado'
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
