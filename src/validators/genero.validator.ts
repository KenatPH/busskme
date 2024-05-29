/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para validar datos de génro desde la api
  Fecha creación  : 10 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

import { check } from 'express-validator';
import { validateResult } from "../utils/validateHandle";
import Genero from "../models/genero.models";

/* var msg_status = 20;
var res_status = 400;

export const validateCreate = [
   check('genero')
      .exists()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 10 })
      .custom(async (value, { req }) => {
         const ge = await Genero.findOne({genero: value.toUpperCase()});
         if(ge) {
            msg_status = 21;
            res_status = 409;
            throw new Error('The gender already exists!');         
         }
         return true;
      }),

   (req: any, res: any, next: any) => {
      validateResult(req, res, next,msg_status,res_status);
   }
]

export const validateUpdate = [   
   check('genero')
      .exists()
      .trim().notEmpty()
      .isLength({ min: 3, max: 10 })
      .custom(async (value, { req }) => {
         const ge = await Genero.findOne({genero: value.toUpperCase()});
         if(ge) {
            msg_status = 22;
            res_status = 409;
            throw new Error('The gender already exists!');         
         }
         return true;
      }),

   (req: any, res: any, next: any) => {
      validateResult(req, res, next,msg_status,res_status);
   }
] */