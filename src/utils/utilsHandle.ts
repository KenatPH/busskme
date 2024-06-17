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
}

export default new utilsHandle();