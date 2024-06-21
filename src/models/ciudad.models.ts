/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de ciudades
  Fecha creación  : 08 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import { Schema, model, Document, ObjectId, PaginateModel } from "mongoose";
import {ciudadSchema} from "../schemas/ciudad.schema";
import paginate, { paginateSubDocs } from 'mongoose-paginate-v2';

export interface ICiudad extends Document {   
   paisid: Schema.Types.ObjectId,
   estadoid: Schema.Types.ObjectId,   
   municipioid: Schema.Types.ObjectId,   
   nombre: string,     
   activo: boolean,
   createdAt: Date,
   updateAt: Date
}
ciudadSchema.plugin(paginate);
export default model<ICiudad, PaginateModel<ICiudad>>('Ciudad', ciudadSchema);