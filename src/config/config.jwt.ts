/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para verificar token, enviar data del token, verificar accesos
  Fecha creación  : 27 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/


import jwt from 'jsonwebtoken'
import config from "./config";
import express, { Request, Response } from "express";
import { httpCode } from "../utils/httpStatusHandle";
import { session } from 'passport';

export const getToken = (payload:any, expires: string) => {   
   return jwt.sign(
   {
      data: payload
   }, config.JWT_SECRET,
   {
      expiresIn: expires
   });
}

export const getTokenData = (token:any) => {
   try {
      const result = jwt.verify(token, config.JWT_SECRET) as {data:any};
      return result;
   } catch (error) {
      console.log('no autorizado');
      return null;
   }      
}

export const checkAuth = async (req: Request, res: Response, next:any) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || authHeader === null  || authHeader === undefined) {
      return res.status(httpCode[401].code).json({
         data_send: "",
         num_status: httpCode[401].code,
         msg_status: 'Unauthorized, or invalid token'
      });      
   }
   const token = authHeader.split(' ')[1]; // Extrae el token
   const tokenVerified = await getTokenData(token);
   
   if(tokenVerified !== null && tokenVerified.data.id){         
      const currentTimestamp = Math.floor(Date.now() / 1000); // Fecha actual en segundos 
      req.user = tokenVerified.data.id;        
      next();          
   }else{
      return res.status(httpCode[401].code).json({
         data_send: "",
         num_status: httpCode[401].code,
         msg_status: 'Unauthorized, or invalid token'
      });  
   }
}