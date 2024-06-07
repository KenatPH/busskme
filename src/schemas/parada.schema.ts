/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de paradas
  Fecha creación  : 16 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const paradaSchema = new Schema ({   
   rutaid: {
      type: Schema.Types.ObjectId,
      ref: 'Ruta'
    },   
   nombre: {
      type: String,
      required: true
   },
   latitud: {
      type: String,
      required: true
   },
   longitud: {
      type: String,
      required: true
   },
   cod_qr: {
      type: String,      
   },
   activo: {
      type: Boolean,
      default:true
   }     
},{versionKey: false, timestamps: true}
);
