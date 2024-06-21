/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para manejar los mensajes de validaciones desde la api
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    : 
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import * as dns from 'dns';
import {ObjectId} from 'mongodb';
import moment from 'moment';

class utilsHandle {
   constructor() {
   }
   //función para generar un código aleatorio para confirmar la cuenta del usuario
   codeRandom() {
      //devuelve un código aleatorio de 10 digitos entre letras y números
      const random = Math.random().toString(36).substring(2,12);
      return random;      
   } 

   async verifyEmail(email:string) {
      const host = email.split('@');
      try {
         
         const mxrecords = await dns.resolveMx(host[1], (err, addresses) => {
            if (err) {
              console.error('Error resolving MX records:', err);
              return false;
            } else {
              console.log('MX records for example.com:');
              for (const address of addresses) {
                console.log(`Priority: ${address.priority}, Exchange: ${address.exchange}, mxrecords: ${mxrecords}`);
              }
              return true;
            }
         });
         
      } catch (error) {
         return false;
      }
   }

   validateFieldID(fieldValue: any) {      
      if (fieldValue === null || fieldValue === undefined || !fieldValue || !ObjectId.isValid(fieldValue)) {
        return false; 
      }          
      return true; 
   };

   validateFieldAlfaNum(fieldValue: string | undefined | null) {
      const validaRegex = /^[a-zA-Z0-9]+$/;
      
      if (!fieldValue || fieldValue === null || fieldValue === 'null' || fieldValue === undefined || fieldValue === 'undefined') {
        return false; 
      }
    
      if (!validaRegex.test(fieldValue)) {
        return false; 
      }    
      return true; 
   };

   validateFieldNum(fieldValue: string | undefined | null) {
      const validaRegex = /^[0-9]+$/;
      
      if (!fieldValue || fieldValue === null || fieldValue === 'null' || fieldValue === undefined || fieldValue === 'undefined') {
         return false; 
      }
      
      if (!validaRegex.test(fieldValue)) {
         return false; 
      }    
      return true; 
   };

   validateFecha(fieldValue: string){
      if (!moment(fieldValue, 'YYYY-MM-DD', true).isValid()) {
         return false; 
      }
      return true;
   }

   validateFieldLetra(fieldValue: string | undefined | null) {
      const validaRegex = /^[a-zA-Z ]+$/;
      
      if (!fieldValue || fieldValue === null || fieldValue === 'null' || fieldValue === undefined || fieldValue === 'undefined') {
        return false; 
      }
    
      if (!validaRegex.test(fieldValue)) {
        return false; 
      }    
      return true; 
   };

}

export default new utilsHandle();