/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de modelos de vehículos, asociados a una marca
  Fecha creación  : 25 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const modelovehSchema = new Schema ({   
   marcaid: {
      type: Schema.Types.ObjectId,
      ref: 'Marcas'
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
