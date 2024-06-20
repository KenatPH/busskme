/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para validar datos de jugador desde la api
  Fecha creación  : 26 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { check } from 'express-validator';
import { validateResult } from "../utils/validateHandle";
import User from "../models/users.models";
import { httpCode } from "../utils/httpStatusHandle";
import config from '../config/config';

var num_status = 0;
var msg_status = "";
var res_status = 400;

export const validateLogin = [
   check('correo')
      .exists()
      .not().isEmpty()
      .isEmail()
      .custom(async (value, { req }) => { 
         
         if(value === undefined || value === null || value === "" || value === " "){
            num_status = httpCode[422].code
            msg_status = httpCode[422].message;
            res_status = httpCode[422].code;
            throw new Error('The value of the email field is undefined!');
         }      
         const user = await User.findOne({correo: value});
         if(!user) {
            num_status = httpCode[404].code
            msg_status = httpCode[404].message;
            res_status = httpCode[404].code;
            throw new Error('User not exists!');         
         }else{
            if(user.confirmado === false){
               num_status = httpCode[422].code
               msg_status = httpCode[422].message;
               res_status = httpCode[422].code;                             
               throw new Error('The account must be confirmed, an email will be sent to you to confirm your account, to be able to log in!');
            }
            if(user.activo === false){
               num_status = httpCode[422].code
               msg_status = httpCode[422].message;
               res_status = httpCode[422].code;
               throw new Error('Account is disabled, contact Best Padel Ranking administrator or support!');                
            }
         }
         return true;         
      }),             
   check('clave')
      .exists()
      .not().isEmpty()
      .custom(async (value, { req }) => {
         const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,50}$/;
         
         if(!passRegex.test(value)) {            
            num_status = httpCode[409].code
            msg_status = httpCode[602]+'.'+config.IDIOMA;
            res_status = httpCode[409].code;
            throw new Error('invalid password in authentication, you must use at least one lowercase letter, one uppercase letter, one number and at least one special character @$!%*#?&.');         
         }         
         return true;         
      }),   
   (req: any, res: any, next: any) => {      
      validateResult(req, res, next,num_status,res_status,msg_status);
   }
]
