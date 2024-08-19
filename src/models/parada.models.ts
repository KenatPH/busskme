/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de paradas 
  Fecha creación  : 16 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, model, Document } from "mongoose";
import { paradaSchema } from "../schemas/parada.schema";


export interface IParada extends Document {  
   rutaid: Schema.Types.ObjectId, 
   municipioid: Schema.Types.ObjectId,        
   nombre: string,
   latitud: string,
   longitud: string,
   distancia: Schema.Types.Decimal128,
   cod_qr: string,     
   aprobado: boolean,
   orden:Number, 
   activo: boolean, 
   createdAt: Date,
   updateAt:Date         
}

export default model<IParada>('Parada', paradaSchema);