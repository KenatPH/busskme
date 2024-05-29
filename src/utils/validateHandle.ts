/*
  Empresa         : Bioonix
  Aplicación      : Api de BPRanking
  Módulo          : Archivo para manejar los mensajes de validaciones desde la api
  Fecha creación  : 09 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de BPRanking
*/

const { validationResult } = require('express-validator');

export const validateResult = (req: any, res: any, next: any, num_status: number, res_status: number, msg_status:string) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(res_status).json({ 
            data_send: "",
            num_status:num_status,
            msg_status: msg_status
         });
      }
      next();
   } catch (error) {
      console.log('Error en validateResult', error);
   }
}