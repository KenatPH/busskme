/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el schema de usuarios de la página
  Fecha creación  : 12 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, model, Document } from "mongoose";
import { IUser } from "../models/users.models";
const  bcrypt = require("bcryptjs");

export const userSchema = new Schema({
   idcode: {
      type: Number,
      default: 0
   }, 
   nombre: {
      type: String,
      required: [true, 'El nombre completo es obligatorio']      
   }, 
   fecha_nacimiento: {
      type: Date
   },
   genero: {
      type: String
   }, 
   dni: {
      type: String,
      required: [true, 'El Número de cédula es obligatorio']      
   }, 
   correo: {
      type: String,
      unique: true,
      required: [true, 'El correo es requerido'],
      lowercase: true,
      trim: true
   }, 
   telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio']      
   }, 
   idioma: {
      type: String,      
   }, 
   direccion: {
      type: String,
      required: [true, 'La direccion es necesaria']
   },  
   fotoperfil: {
      type: String      
   },
   fotopreferencial: { 
      type: String
    },
   clave: {
      type: String,
      required: [true, 'La contraseña es necesaria']
   },
   fbkid: {
      type: String,
      default: "0"      
   },
   goolgleid: {
      type: String,
      default: "0"      
   },
   tokenFacebook: {
      type: String,
      default: "0"      
   },
   tokenGoogle: {
      type: String,
      default: "0"      
   },
   origen: {
      type: String, 
      default: 'local'
   },   
   roles: [
      {
         ref: 'Role',   
         type: Schema.Types.ObjectId,      
      }
   ], 
   intentos:{  
      type:Number,
      default:0
   },      
   confirmado: {    
      type: Boolean,
      default: false
   },    
   activo: {    
      type: Boolean,
      default: true
   },
   preferencialid: {
      ref: 'TipoPreferencial',
      type: Schema.Types.ObjectId,
   },
   resetPasswordToken:{
      type: String
   },
   resetPasswordExpires:{
      type: Date

   } 
},{versionKey: false, timestamps: true}
);

userSchema.pre<IUser>('save', async function(next) {
   const user = this;
   
   if (!user.isModified('clave')) return next();

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(user.clave, salt);
   user.clave = hash;
   
});

userSchema.methods.comparePassword = async function(clave: string): Promise<boolean>{
   return await bcrypt.compare(clave, this.clave);
}

export default model('User', userSchema);