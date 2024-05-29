/*
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de paises
  Fecha creación  : 26 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import { Schema, model, Document } from "mongoose";
import { roleSchema } from "../schemas/role.schema";

export interface IRole extends Document {   
   nombre: string,   
   activo: boolean,
   createdAt: Date,
   updateAt:Date
}

export default model<IRole>('Role', roleSchema);