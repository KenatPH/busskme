/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de rutas 
  Fecha creación  : 14 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, model, Document } from "mongoose";

export const rutaSchema = new Schema({
   idcode:{
      type: Number
   },
   codigo:{  //ejemplo R201
      type: String,
      required: [true, 'El código de la ruta es requerido'],
      unique:true
   },
   nombre: {  //nombre o descripción de la ruta RUTA 201
      type: String,
      required: [true, 'El nombre de la ruta es requerido']
   },   
   color: { //código del color hexadecimal 
      type: String,
      required: [true, 'El color de la ruta es requerido']
   },   
   aprobado: {    //permite saber si busskm ya ha aprobado el registro
      type: Boolean,
      default: false
   }, 
   activo: {    //permite saber si el registro está activo, default=true
      type: Boolean,
      default: true
   } 
},{versionKey: false, timestamps: true}
);

export default model('Ruta', rutaSchema);