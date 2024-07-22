/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de métodos de pago
  Fecha creación  : 18 de Jun del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const metodopagoSchema = new Schema ({ 
    paisid: {
        type: Schema.Types.ObjectId,
        ref: 'Pais'
    },  
    tipoid: {
        type: Schema.Types.ObjectId,
        ref: 'TipoPago'
    },       
    titulo: {
        type: String,
        required: true
    }, 
    referencia: {
        type: String,
        required: true
    }, 
    imagen: {
        type: String
    },                
    activo: {
        type: Boolean,
        default:true
    }
},{versionKey: false, timestamps: true}
);
