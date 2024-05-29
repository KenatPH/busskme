/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de marcas de vehículos
  Fecha creación  : 26 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import { Schema, model, Document } from "mongoose";
import { modelovehSchema } from "../../schemas/vehiculo/modeloveh.schema";


export interface IModeloveh extends Document {   
   marcaid: Schema.Types.ObjectId,
   nombre: string,   
   activo: boolean,
   createdAt: Date,
   updateAt:Date
}

export default model<IModeloveh>('Modeloveh', modelovehSchema);