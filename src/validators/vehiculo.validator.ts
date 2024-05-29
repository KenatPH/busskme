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
import Vehiculo from "../models/vehiculos/vehiculo.models";

var msg_status = 0;
var res_status = 400;

/* export const validateCreate = [
   check('placa')
      .exists()
      .not().isEmpty()      
      .custom(async (value, { req }) => {
         const vh = await Vehiculo.findOne({placa: value.toUpperCase()});
         if(vh) {
            msg_status = 22;
            res_status = 409;
            throw new Error('The vehiculo already exists!');         
         }
         return true;
      }),      
   check('marca')
      .exists()
      .not().isEmpty(), 
   check('modelo')
      .exists()
      .not().isEmpty(),        
   (req: any, res: any, next: any) => {
      res_status = 409;
      msg_status = 19
      validateResult(req, res, next,msg_status,res_status);
   }
]

export const validateUpdate = [
   check('placa')
      .exists()
      .not().isEmpty()      
      .custom(async (value, { req }) => {
         const vh = await Vehiculo.findOne({placa: value.toUpperCase()});
         if(vh) {
            msg_status = 22;
            res_status = 409;
            throw new Error('The placa already exists!');         
         }
         return true;
      }),      
   check('marca')
      .exists()
      .not().isEmpty(), 
   check('modelo')
      .exists()
      .not().isEmpty(),        
   (req: any, res: any, next: any) => {
      res_status = 409;
      msg_status = 19
      validateResult(req, res, next,msg_status,res_status);
   }
]




 */