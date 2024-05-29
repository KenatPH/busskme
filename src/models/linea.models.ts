/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el model de organización o línea de transporte
  Fecha creación  : 17 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import { Schema, model, Document } from "mongoose";
import { lineaSchema } from "../schemas/linea.schema";


export interface IOrganizacion extends Document {  
   nro_cps:string,   
   nombre: string,   
   dni: string,   
   paisid: number,
   estadoid: number,
   ciudadid: number,
   direccion: string,
   correo_org: string,
   telefono_org: string,
   instagram: string,
   web: string,
   redx: string,  //twitter
   facebook: string,
   tiktok: string,
   logo: string,
   gerente: string,
   correo_gerente: string, 
   telefono_gerente: string,
   aprobado: boolean, //false por default, hasta que bpr apruebe el registro     
   activo: boolean,
   createdAt: Date,
   updateAt:Date
}

export default model<IOrganizacion>('Organizacion', lineaSchema);