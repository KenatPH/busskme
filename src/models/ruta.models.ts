/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de rutas 
  Fecha creación  : 14 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, model, Document } from "mongoose";
import { rutaSchema } from "../schemas/ruta.schema";


export interface IRuta extends Document {  
   idcode: number,  
   codigo: string,
   nombre: string,
   color: string,     
   aprobado: boolean, 
   activo: boolean, 
   createdAt: Date,
   updateAt:Date         
}

export default model<IRuta>('Ruta', rutaSchema);