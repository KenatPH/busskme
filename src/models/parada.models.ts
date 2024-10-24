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
   codigo: string,
   nombre: string,
   latitud: string,
   longitud: string,
   cod_qr: string,     
   aprobado: boolean, //permite saber si busskm ya ha aprobado el registro, hasta que no se apruebe no puede iniciar sesión
   activo: boolean, //permite saber si la ruta está activa, default=true   
   createdAt: Date,
   updateAt:Date         
}

export default model<IParada>('Parada', paradaSchema);