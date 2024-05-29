/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de roles del sistema
  Fecha creación  : 26 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const roleSchema = new Schema ({   
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
