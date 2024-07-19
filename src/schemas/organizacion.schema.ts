/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de organizacion
  Fecha creación  : 03 de Jun del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, model, Document } from "mongoose";

export const organizacionSchema = new Schema({
   userid: { 
      type: Schema.Types.ObjectId,
      ref: 'User'
   },  
   paisid: {
      type: Schema.Types.ObjectId,
      ref: 'Pais'
    },
   estadoid: {
      type: Schema.Types.ObjectId,
      ref: 'Estado'
   },
   municipioid: {
      type: Schema.Types.ObjectId,
      ref: 'Municipio'
   }, 
   ciudadid: {
      type: Schema.Types.ObjectId,
      ref: 'Ciudad'
   },
   nro_cps:{
      type: String
   },    
   fecha_exp_cps:{
      type: Date
   },
   fecha_venc_cps:{
      type: Date
   },
   codigo_cps:{
      type: String
   }, 
   modalidad_servicio:{
      type: String
   },
   tipologia_unidades:{
      type: String
   },
   cupo_autorizado:{
      type: String
   },
   nombre_org:{
      type: String
   }, 
   tipo_organizacion:{
      type: String
   },
   fecha_registro:{
      type: Date
   },
   duracion_junta:{
      type: Number
   },
   fecha_venc_junta:{
      type: Date
   }, 
   nombre_oficina_registro:{
      type: String
   },    
   nro_rif:{
      type: String
   },   
   fecha_inscrip_rif:{
      type: Date
   },
   fecha_emision_rif:{
      type: Date
   },
   fecha_venc_rif:{
      type: Date
   },
   direccion_fiscal:{
      type: String
   },   
   nro_socios:{
      type: Number
   }, 
   nro_rutas:{
      type: Number
   },
   descripcion_rutas:{
      type: String
   },
   img_acta_constitutiva: [
      {            
         type: String,      
      }
   ],  
   img_rif:{
      type: String
   },  
   img_cps:{
      type:String
   },
   img_ult_acta_asamblea: [
      {            
         type: String,      
      }
   ],
   aprobado: {    
      type: Boolean,
      default: false
   }, 
   activo: {    
      type: Boolean,
      default: true
   }
},{versionKey: false, timestamps: true}
);

