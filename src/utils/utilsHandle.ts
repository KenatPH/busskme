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
import config from '../config/config';
import { io } from "socket.io-client";

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
      const validaRegex = /^[a-zA-ZÀÁÉÍÓÚàáéíóúñÑ0-9 ]+$/;
      
      if (!fieldValue || fieldValue === null || fieldValue === 'null' || fieldValue === undefined || fieldValue === 'undefined') {
        return false; 
      }
    
      if (!validaRegex.test(fieldValue)) {
        return false; 
      }    
      return true; 
   };

   validateFieldDireccion(fieldValue: string | undefined | null):boolean {
      const validaRegex = /^[a-zA-ZÀÁÉÍÓÚàáéíóúñÑ0-9 ,.]+$/;
      
      if (!fieldValue || fieldValue === null || fieldValue === 'null' || fieldValue === undefined || fieldValue === 'undefined') {
        return false; 
      }
    
      if (!validaRegex.test(fieldValue)) {
        return false; 
      }    
      return true; 
   };

   

   validateFieldNum(fieldValue: string | undefined | null):boolean {
      const validaRegex = /^[0-9]+$/;
      
      if (!fieldValue || fieldValue === 'null' || fieldValue === 'undefined') {
         return false; 
      }
      
      if (!validaRegex.test(fieldValue)) {
         return false; 
      }    
      return true; 
   };

   validateFieldLatitudLongitud(fieldValue: string | undefined | null): boolean {
      const validaRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

      if (!fieldValue || fieldValue === 'null' || fieldValue === 'undefined') {
         return false;
      }

      if (!validaRegex.test(fieldValue)) {
         return false;
      }
      return true;
   };

   validateFecha(fieldValue: string):boolean{
      if (!moment(fieldValue, 'YYYY-MM-DD', true).isValid()) {
         return false; 
      }
      return true;
   }

   
   validateFieldLetra(fieldValue: string | undefined | null): boolean {
      const validaRegex = /^[a-zA-ZÀÁÉÍÓÚàáéíóúñÑ ]+$/;
      
      if (!fieldValue || fieldValue === 'null' || fieldValue === 'undefined') {
        return false; 
      }
    
      if (!validaRegex.test(fieldValue)) {
        return false; 
      }    
      return true; 
   };

   validateFieldClave(fieldValue: string | undefined | null): boolean {
      const validaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,50}$/;
      
      if (!fieldValue || fieldValue === 'null' || fieldValue === 'undefined') {
        return false; 
      }
    
      if (!validaRegex.test(fieldValue)) {
        return false; 
      }    
      return true; 
   };
   validateTime24HourFormat(timeStr: string): boolean {
      // Expresión regular para validar el formato HH:MM
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

      return regex.test(timeStr);
      
   }

   // // Ejemplos de uso:
   // console.log(isValidTime24HourFormat("13:05")); // true
   // console.log(isValidTime24HourFormat("02:15")); // true
   // console.log(isValidTime24HourFormat("24:00")); // false
   // console.log(isValidTime24HourFormat("10:60")); // false
   // console.log(isValidTime24HourFormat("10:15 PM")); // false

   llamarSocket(data: any, emit: any) {
      console.log("llamarSocket");
      

      const urlSocket = config.WS.HOST

      if (urlSocket) {
         console.log(urlSocket);
         
         var socket = io(urlSocket);

         socket.emit(emit, data);

         // socket.close()
      }

   }

}

export default new utilsHandle();