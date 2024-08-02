/*
  Aplicación      : Api de Dominó
  Módulo          : Archivo que recibe la configuración para la conexión a la BD y se conecta a mongodb
  Fecha creación  : 23 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Dominó
*/

import mongoose  from "mongoose";
import config from "./config/config";

var db_uri="";
if(!config.RUN_MODE){
   db_uri = "mongodb://buskm:FdXspPNirP4Q7M8Pr6tIuunHSvmXn1712%23adhH6zsZn5d3xenEqqN9ZQv0409@206.189.198.108:32770/busskm?authMechanism=DEFAULT"
   // db_uri = "mongodb://127.0.0.1:27017/busskm"
   // if(config.DB.URI !== undefined){
   //    db_uri = config.DB.URI;
   // }
}else{
   if(config.DB.URI !== undefined){
      db_uri = config.DB.URI;
   }
}

export const connectDB = async () => {   
   try {
      console.log(db_uri);
      
      await mongoose.connect(db_uri)
      console.log('Mongodb connection stablished');
      const connection = mongoose.connection;

      connection.on('error', (error) => {
         console.error('Error de conexión con bd mongodb:', error);
         process.exit(0);
      });
       
      connection.once('open', () => {
         console.log('Mongodb connection stablished');
      })
      
   } catch (error) {
      console.log('Error in connection db ',error);
      process.exit(0);    
   }
}





