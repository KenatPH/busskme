/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para validar datos de categoría desde la api
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { check } from 'express-validator';
import { validateResult } from "../utils/validateHandle";
import Ruta from "../models/ruta.models";
import { httpCode } from "../utils/httpStatusHandle";

var num_status = 0;
var msg_status = "";
var res_status = 400;

export const validateCreate = [
   check('codigo')
      .exists()
      .not().isEmpty()      
      .custom(async (value, { req }) => {
         const ca = await Ruta.findOne({codigo: value.toUpperCase()});
         if(ca) {
            num_status = httpCode[404].code
            msg_status = httpCode[404].message;
            res_status = httpCode[404].code;
            throw new Error('The route already exists!');         
         }
         return true;
      }),      
   check('nombre')
      .exists()
      .not().isEmpty()      
      .custom(async (value, { req }) => {
         const ca = await Ruta.findOne({nombre: value.toUpperCase()});
         if(ca) {
            num_status = httpCode[404].code
            msg_status = httpCode[404].message;
            res_status = httpCode[404].code;
            throw new Error('The route already exists!');         
         }
         return true;
      }),   
   (req: any, res: any, next: any) => {      
      validateResult(req, res, next,num_status,res_status,msg_status);
   }
]
