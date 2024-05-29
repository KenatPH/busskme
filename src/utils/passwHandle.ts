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
import { userSchema } from "../schemas/users.schema";
import { IUser } from "../models/users.models";
const  bcrypt = require("bcryptjs");

class passwHandle {
   
   constructor() {           
   } 
   //función para hashear la contraseña
   hashedPassw() {
      userSchema.pre<IUser>('save', async function(next) {
         const user = this;
         //si no modifica password no vuelve a hacer el hash del passw
         if (!user.isModified('clave')) return next();
      
         const salt = await bcrypt.genSalt(10);
         const hash = await bcrypt.hash(user.clave, salt);
         user.clave = hash;         
      });
   }
   
}

export default new passwHandle();
