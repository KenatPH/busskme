/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para validar datos de categoría desde la api
  Fecha creación  : 09 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import { check } from 'express-validator';
import { validateResult } from "../utils/validateHandle";
import Categoria from "../models/educacion.models";
import { httpCode } from "../utils/httpStatusHandle";

var num_status = 0;
var msg_status = "";
var res_status = 400;
export const validateCreate = [
   check('nombre')
      .exists()
      .not().isEmpty()
      .custom(async (value, { req }) => {
         const ca = await Categoria.findOne({nombre: value.toUpperCase()});
         if(ca) {
            num_status = httpCode[404].code
            msg_status = httpCode[404].message;
            res_status = httpCode[404].code;
            throw new Error('The category already exists!');         
         }
         return true;
      }),      
   check('genero')
      .exists()
      .not().isEmpty(),
   (req: any, res: any, next: any) => {      
      validateResult(req, res, next,num_status,res_status,msg_status);
   }
]
