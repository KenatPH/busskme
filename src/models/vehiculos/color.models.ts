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
import { colorSchema } from "../../schemas/vehiculo/color.schema";


export interface IColor extends Document {      
   color: string,   
   activo: boolean,
   createdAt: Date,
   updateAt:Date
}
export default model<IColor>('Color', colorSchema);