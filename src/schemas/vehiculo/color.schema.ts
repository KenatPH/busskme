/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de colores de vehículos
  Fecha creación  : 30 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const colorSchema = new Schema ({   
   
   color: {
      type: String,
      required: true
   },     
   activo: {
      type: Boolean,
      default:true
   } 
},{versionKey: false, timestamps: true}
);
