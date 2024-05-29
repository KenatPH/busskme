/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de ciudades
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const estadoSchema = new Schema ({
   pais: {
      type: String,
      required: true
   },
   paisid: {
      type: Schema.Types.ObjectId,
      ref: 'Pais'
    },
   estado: {
      type: String,
      required: true
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
