/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para verificar acceso a las rutas protegidas del sistema
  Fecha creación  : 27 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import {Strategy, ExtractJwt, StrategyOptions}  from 'passport-jwt'
import config from '../config/config'
import User from '../models/users.models'

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
};

export default new Strategy(opts, async (payload, done) => {
   try {      
      const user = await User.findById(payload.data.id);
      if(user) {         
         return done(null, true);
      }      
      return done(null, false);     
   } catch (error) {      
      console.log(error);
   }   
})
