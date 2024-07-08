/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de vehiculos 
  Fecha creación  : 14 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, model, Document } from "mongoose";

export const vehiculoSchema = new Schema({
   userid: { //id del usuario registrado como conductor propietario
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   choferid: { //id del usuario registrado como conductor propietario
      type: Schema.Types.ObjectId,
      ref: 'Chofer'
   },    
   nro_certificado_registro:{
      type: String
   }, 
   placa:{
      type: String,
      required: [true, 'La placa del vehículo es requerida']
   },
   serial_niv:{
      type: String
   }, 
   serial_chasis:{
      type: String
   }, 
   serial_carroceria:{
      type: String
   }, 
   serial_motor:{
      type: String
   }, 
   marcaid: {  
      type: Schema.Types.ObjectId,
      ref: 'Marcas'
   },  
   modeloid: {
      type: Schema.Types.ObjectId,
      ref: 'Modeloveh'
   },  
   colorid: {
      type: Schema.Types.ObjectId,
      ref: 'Color'      
   },
   anno:{
      type: Number
   },  
   clase: {
      type: String      
   },
   tipo:{
      type: String      
   },
   uso:{
      type: String      
   },
   servicio:{
      type: String      
   }, 
   puestos:{
      type: Number
   }, 
   intt_nro:{
      type: String      
   },
   fecha_emision_intt:{
      type: Date      
   },   
   nro_autorizacion:{
      type: String      
   },
   img_certificado: { 
      type: String
   },       
   empresa_seguro:{ 
      type: String
   },   
   nro_poliza:{ 
      type: String
   },   
   nro_sudeaseg:{ 
      type: String
   },   
   fecha_emision_poliza:{ 
      type: Date
   },   
   fecha_venc_poliza:{ 
      type: Date
   },
   img_poliza:{ 
      type: String
   }, 
   aprobado: {    //permite saber si busskm ya ha aprobado el registro del vehículo
      type: Boolean,
      default: false
   }, 
   activo: {    //permite saber si el vehículo está activo, default=true
      type: Boolean,
      default: true
   }
},{versionKey: false, timestamps: true}
);

export default model('Vehiculo', vehiculoSchema);