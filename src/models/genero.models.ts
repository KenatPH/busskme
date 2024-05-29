/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para definir el model de categorías
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/


import { Schema, model, Document } from "mongoose";
import { generoSchema } from "../schemas/genero.schema";


export interface IGenero extends Document {   
   genero: string, //masculino, femenino, mixto, male, female, mixed   
   activo: number,
   createdAt: Date,
   updateAt:Date
}

export default model<IGenero>('Genero', generoSchema);