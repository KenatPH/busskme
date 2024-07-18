/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de método de pago
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import { Schema, model, Document, ObjectId } from "mongoose";
import {metodopagoSchema} from "../schemas/metodopago.schema";

export interface IMetodopago extends Document {
   paisid: Schema.Types.ObjectId,
   tipoid: Schema.Types.ObjectId, 
   titulo: string,      
   referencia: string, 
   imagen: string,
   activo: boolean,
   createdAt: Date,
   updateAt: Date
}

export default model<IMetodopago>('Metodopago', metodopagoSchema);