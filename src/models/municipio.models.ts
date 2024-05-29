/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de municipios
  Fecha creación  : 27 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import { Schema, model, Document, ObjectId } from "mongoose";
import {municipioSchema} from "../schemas/municipio.schema";

export interface IMunicipio extends Document {   
   paisid: Schema.Types.ObjectId,
   estadoid: Schema.Types.ObjectId,   
   nombre: string,     
   activo: boolean,
   createdAt: Date,
   updateAt: Date
}

export default model<IMunicipio>('Municipio', municipioSchema);