/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el modelo de vehiculo
  Fecha creación  : 14 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, model, Document } from "mongoose";
import { vehiculoSchema } from "../../schemas/vehiculo/vehiculo.schema";


export interface IVehiculo extends Document { 
   userid: Schema.Types.ObjectId,
   choferid: Schema.Types.ObjectId,         
   nro_certificado_registro: string,    
   placa: string,
   serial_niv:string,
   serial_chasis:string,
   serial_carroceria:string,
   serial_motor:string,
   marcaid: Schema.Types.ObjectId,
   modeloid: Schema.Types.ObjectId, 
   colorid: Schema.Types.ObjectId, 
   anno: number,
   codigo_unidad:string,
   clase: string,
   tipo:string,
   uso:string,
   servicio:string,
   puestos: number, 
   intt_nro:string,
   fecha_emision_intt:Date,   
   nro_autorizacion:string,
   img_certificado: string, 
   empresa_seguro:string,
   nro_poliza:string,
   nro_sudeaseg:string,
   fecha_emision_poliza:Date,
   fecha_venc_poliza:Date,
   img_poliza:string,
   aprobado: boolean, 
   activo: boolean, 
   createdAt: Date,
   updateAt:Date         
}

export default model<IVehiculo>('Vehiculo', vehiculoSchema);

