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
import { categoriaSchema } from "../schemas/categorias.schema";


export interface ICategorias extends Document {   
   nombre: string,
   genero: string, 
   edad_min: number,   
   edad_max: number,
   activo: number,
   createdAt: Date,
   updateAt:Date
}

export default model<ICategorias>('Categorias', categoriaSchema);