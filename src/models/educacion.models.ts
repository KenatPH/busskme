/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para definir el model de categorías
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/


import { Schema, model, Document } from "mongoose";
import { educacionSchema } from "../schemas/educacion.schema";


export interface IEducacion extends Document {   
   nombre: string,   
   activo: boolean,
   createdAt: Date,
   updateAt:Date
}

export default model<IEducacion>('Educacion', educacionSchema);