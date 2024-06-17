/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para validar datos de jugador desde la api
  Fecha creación  : 11 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import { check } from 'express-validator';
import { validateResult } from "../utils/validateHandle";
import User from "../models/users.models";
import { httpCode } from "../utils/httpStatusHandle";

var num_status = 0;
var msg_status = "";
var res_status = 400;

export const validateCreate = [
   check('nombre')      
      .custom(async (value, { req }) => {
         if(!value || value == null || value == undefined || value == ""){
            num_status = httpCode[409].code
            msg_status = httpCode[409].message;
            res_status = httpCode[409].code;
            throw new Error('El nombre no puede estar vacío.');         
         }     
         return true;         
      }),   
   check('dni')
      .custom(async (value, { req }) => {
         if(!value || value == null || value == undefined || value == ""){
            num_status = httpCode[409].code
            msg_status = httpCode[409].message;
            res_status = httpCode[409].code;
            throw new Error('El dni es requerido.');         
         }     
         return true;         
      }),              
   check('genero')
      .custom(async (value, { req }) => {
         if(!value || value == null || value == undefined || value == ""){
            num_status = httpCode[409].code
            msg_status = httpCode[409].message;
            res_status = httpCode[409].code;
            throw new Error('El genero es requerido.');         
         }     
         return true;         
      }),
   check('correo')
      .custom(async (value, { req }) => {
         if(!value || value == null || value == undefined || value == ""){
            num_status = httpCode[409].code
            msg_status = httpCode[409].message;
            res_status = httpCode[409].code;
            throw new Error('El correo es requerido.');         
         }     
         return true;         
      }),    
   check('fecha_nacimiento')
      .custom(async (value, { req }) => {
         if(!value || value == null || value == undefined || value == ""){
            num_status = httpCode[409].code
            msg_status = httpCode[409].message;
            res_status = httpCode[409].code;
            throw new Error('La fecha de nacimiento es requerida.');         
         }     
         return true;         
      }),
   check('clave')
           
      .custom(async (value, { req }) => {
         const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,50}$/;
         if(!value || value == null || value == undefined || value == ""){
            num_status = httpCode[409].code
            msg_status = httpCode[409].message;
            res_status = httpCode[409].code;
            throw new Error('La clave es requerida.');         
         }     
         if(!passRegex.test(value)) {            
            num_status = httpCode[409].code
            msg_status = httpCode[409].message;
            res_status = httpCode[409].code;
            throw new Error('invalid password in authentication, you must use at least one lowercase letter, one uppercase letter, one number and at least one special character @$!%*#?&.');         
         }         
         return true;         
      }), 
   check('telefono')
      .custom(async (value, { req }) => {
         if(!value || value == null || value == undefined || value == ""){
            num_status = httpCode[409].code
            msg_status = httpCode[409].message;
            res_status = httpCode[409].code;
            throw new Error('El número de teléfono es requerido.');         
         }     
         return true;         
      }), 
   check('idioma')
   .custom(async (value, { req }) => {
      if(!value || value == null || value == undefined || value == ""){
         num_status = httpCode[409].code
         msg_status = httpCode[409].message;
         res_status = httpCode[409].code;
         throw new Error('El idioma es requerido.');         
      }     
      return true;         
   }),
   check('roles')
   .custom(async (value, { req }) => {
      if(!value || value == null || value == undefined || value == ""){
         num_status = httpCode[409].code
         msg_status = httpCode[409].message;
         res_status = httpCode[409].code;
         throw new Error('El rol del usuario es requerido.');         
      }     
      return true;         
   }),                
   (req: any, res: any, next: any) => {      
      validateResult(req, res, next,num_status,res_status,msg_status);
   }
]
