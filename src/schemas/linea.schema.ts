/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de clubes
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, Document } from "mongoose";

export const lineaSchema = new Schema ({
   idcode: {
      type: Number      
    },   
   nombre: {
      type: String,
      required: true
   },
   dni: {
      type: String,
      required: true
   },
   paisid: {
      type: Number
    },
   estadoid: {
      type: Number
   },
   ciudadid: {
      type: Number
   },
   direccion: {
      type: String      
   }, 
   correo_org:{
      type: String,
      required: true
   },
   telefono_org: {
      type: String
   }, 
   instagram:  {
      type: String
   }, 
   web:  {
      type: String
   }, 
   redx:  {  //twitter
      type: String
   }, 
   facebook:  {
      type: String
   }, 
   tiktok:  {
      type: String
   }, 
   logo: {
      type: String
   },  
   gerente: {
      type: String,
      required: true
   }, 
   correo_gerente:{
      type: String,
      required: true
   },
   telefono_gerente: {
      type: String
   },  
   aprobado: {    //permite saber si bpr ya ha aprobado el club
      type: Boolean,
      default: false
   },   
   activo: {
      type: Number,
      default:1
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   updateAt: {
      type: Date,
      default: Date.now
   }   
});
