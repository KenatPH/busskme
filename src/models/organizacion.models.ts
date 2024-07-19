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
import { organizacionSchema } from "../schemas/organizacion.schema";


export interface IOrganizacion extends Document {  
   userid: Schema.Types.ObjectId,       
   paisid: Schema.Types.ObjectId,
   estadoid: Schema.Types.ObjectId,   
   municipioid: Schema.Types.ObjectId, 
   ciudadid: Schema.Types.ObjectId, 
   nro_cps: string,   
   fecha_exp_cps: Date,
   fecha_venc_cps: Date,
   codigo_cps: string,
   modalidad_servicio:string,
   tipologia_unidades: string,
   cupo_autorizado: string,
   nombre_org: string,
   tipo_organizacion: string,
   fecha_registro: Date,
   duracion_junta: number,
   fecha_venc_junta: Date,
   nombre_oficina_registro: string,
   nro_rif: string,
   fecha_inscrip_rif: Date,
   fecha_emision_rif: Date,
   fecha_venc_rif: Date,
   direccion_fiscal: string,
   nro_socios:number,
   nro_rutas:number,
   descripcion_rutas:string,
   img_acta_constitutiva:string[],
   img_rif:string,
   img_cps:string,
   img_ult_acta_asamblea:string[],   
   aprobado: boolean, 
   activo: boolean,
   createdAt: Date,
   updateAt:Date
}

export default model<IOrganizacion>('Organizaciones', organizacionSchema);