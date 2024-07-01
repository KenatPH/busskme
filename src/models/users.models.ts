/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el modelo de usuario
  Fecha creación  : 12 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Schema, model, Document } from "mongoose";
import { userSchema } from "../schemas/users.schema";

export interface IUser extends Document { 
   idcode: number,  
   nombre: string,   
   fecha_nacimiento: Date,
   genero: string,
   dni: string,
   correo: string,
   telefono: string, 
   idioma:string,   
   direccion:string,
   fotoperfil:string,
   clave: string,   
   fbkid: string,  
   googleid: string,  
   tokenFacebook: string,
   tokenGoogle: string,           
   origen: string,    
   roles: Schema.Types.ObjectId[] 
   intentos: number, 
   confirmado: boolean, 
   activo: boolean,
  resetPasswordToken:string,
  resetPasswordExpires:Date, 
   createdAt: Date,
   updateAt:Date      
   comparePassword: (clave: string) => Promise<boolean>;
}


export default model<IUser>('User', userSchema);