/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir el guardado de imagenes de la api
  Fecha creación  : 14 de May del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/
import express,  { Request, Response }  from 'express';
import multer, { Multer } from 'multer';
import config from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongoose';
import fs from 'fs-extra';
import path from 'path';

class MulterMiddleware {
   private storage: multer.StorageEngine;
   private limits = {fileSize:  2*1024*10124};
   constructor(private destination: string, private origen:string) {  
      
     this.storage = multer.diskStorage({       
       destination: (req, file, cb) => {
         console.log("esto es destination: ",destination );
                  
         if(destination !== null || destination !== undefined || destination !== ""){
            if (!fs.existsSync(`${destination}`)) {
               fs.mkdirSync(destination, { recursive: true });              
            }
         }         
         cb(null, destination); 
       },
       filename: (req, file, cb) => { 
         /* const fileType = file.mimetype;
         this.fileTest(fileType,cb);                           */
         const uuidname = `${uuidv4()}${path.extname(file.originalname)}`;                
         cb(null, uuidname); // Nombre de archivo único
       },       
     });       
   
   //     this.storage = multer.diskStorage({
   //    destination: (req, file, cb) => {
   //      console.log('Destino:', this.destination);

   //      if (this.destination) {
   //        // Asegura la creación del directorio si no existe
   //        fs.ensureDirSync(this.destination);
   //      }
   //      cb(null, this.destination);
   //    },
   //    filename: (req, file, cb) => {
   //      const uuidname = `${uuidv4()}${path.extname(file.originalname)}`;
   //      cb(null, uuidname); // Nombre de archivo único
   //    },
   //  });
   }
     
   public getMiddleware(): multer.Multer { 
               //  console.log("llego aqui al menos");
                
      return multer({         
         storage: this.storage,               
         limits: this.limits,
         fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
               console.log("entro en condicion");
               cb(new Error('Solo los siguientes formatos .jpg, .jpeg, .png, están permitidos!'));               
            } else {
               console.log("entro en el else");
               
               cb(null, true);
            }
         },                          
      });                        
   }  

   public getMiddlewareArch(): multer.Multer { 
                
      return multer({         
         storage: this.storage,               
         limits: this.limits,
         fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|xlsx|docx)$/i)) {
               cb(new Error('Solo los siguientes formatos .jpg, .jpeg, .png, .pdf, .xlsx, .docx, están permitidos!'));               
            } else {
               cb(null, true);
            }
         },                          
      });                        
   } 

   /* fileTest(fileType:any,cb:any) {
      const pattern = /jpg/
      const result = pattern.test(fileType);
      if(!result){
         cb(new Error('Solo los siguientes formatos .jpg, .jpeg, .png, están permitidos.'));
      }
      console.log(result);
      return result;
   } */
   
 }
 
 export default MulterMiddleware;

