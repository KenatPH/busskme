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


class utilsHandle {
   constructor() {
   }
   //función para generar un código aleatorio para confirmar la cuenta del usuario
   codeRandom() {
      //devuelve un código aleatorio de 10 digitos entre letras y números
      const random = Math.random().toString(36).substring(2,12);
      return random;      
   }   
}

export default new utilsHandle();