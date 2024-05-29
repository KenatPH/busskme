/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para validar datos de perfiles desde la api
  Fecha creación  : 17 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { check } from 'express-validator';
import { validateResult } from "../utils/validateHandle";
import Role from "../models/role.models";

/* var msg_status = 0;
var res_status = 400;
export const validateCreate = [     
   check('nombre')
      .exists()
      .not().isEmpty()      
      .custom(async (value, { req }) => {
         const ca = await Role.findOne({nombre: value.toUpperCase()});
         if(ca) {
            msg_status = 23;
            res_status = 409;
            throw new Error('The role already exists!');         
         }
         return true;
      }),   
   (req: any, res: any, next: any) => {      
      validateResult(req, res, next,msg_status,res_status);
   }
]
 */