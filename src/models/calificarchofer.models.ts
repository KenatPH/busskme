/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de calificar chofer
  Fecha creación  : 25 de Jun del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import { Schema, model, Document, ObjectId, PaginateModel } from "mongoose";
import {calificarChoferSchema} from "../schemas/calificarchofer.schema";
import paginate, { paginateSubDocs } from 'mongoose-paginate-v2';

export interface ICalificarchofer extends Document {   
   
   userid: Schema.Types.ObjectId, 
   choferid: Schema.Types.ObjectId, 
   comentario: string,
   calificacion: number,      
   activo: boolean,
   createdAt: Date,
   updateAt: Date
}
calificarChoferSchema.plugin(paginate);
export default model<ICalificarchofer, PaginateModel<ICalificarchofer>>('Calificarchofer', calificarChoferSchema);