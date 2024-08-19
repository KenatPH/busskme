/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crear de forma automática, configuraciones iniciales del sistema
  Fecha creación  : 26 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { ObjectId } from "mongoose";
import Role from "../models/role.models";
import User from "../models/users.models";
import TipoPago from "../models/tipoPago.models"
import Pais from "../models/paises.models"
import Estado from "../models/estados.models"
import Municipio from "../models/municipio.models"
import Ciudad from "../models/ciudad.models"
import Educacion from "../models/educacion.models"
import config from "../config/config";
import fs from 'fs-extra';
import path from 'path';

class initialConfig {
   
   private idcode: number; //afiliado
   private nombre: string;
   private correo: string;
   private clave: string;       
   private confirmado: boolean; //por default=false, si el usuario ha confirmado su correo es true, sino false      
   private direccion:string;
   

   constructor() {      
      this.idcode = 0;
      this.correo = "jlramirez17@gmail.com";
      this.nombre = "José Luis Ramírez";
      this.clave = "Aguila17.";
      this.confirmado = true; 
      this.direccion = "villa rosa";
   }
   
   cerateDirStorage() {
      try {
         this.createDirectorio(); // crea directorio storage         
       } catch (error) {
         console.error('Error al crear directorio storage/imgs roles y usuario:');
       }
   }

   async createRolesAndUser() {
      try {
         await this.createEducacion()
         await this.createPaisCiudadEstado();
        await this.createRoles(); // Espera a que se creen los roles
        await this.createUser(); // Luego crea el usuario
        await this.createTipoPagos();
      } catch (error) {
        console.error('Error al configurar roles y usuario:');
      }
   }

   async createDirectorio(){
      const storagePath = path.resolve(config.STORAGEAPI.destination);
      
      if (!fs.existsSync(storagePath)) {
         await fs.mkdirSync(storagePath);
         console.log(`Carpeta "storage" creada correctamente.`);
      }
      if (!fs.existsSync(`${storagePath}/imgs`)) {
         await fs.mkdirSync(`${storagePath}/imgs`);         
      }
   }
   
   async createRoles() {
      try {
         const count = await Role.estimatedDocumentCount();
         
         if (count > 0) return;
         
         

         const values = await Promise.all([      
            new Role({ nombre: "superadmin", activo:true }).save(),      
            new Role({ nombre: "admin", activo:true }).save(),      
            new Role({ nombre: "cliente", activo:true }).save(),      
            new Role({ nombre: "chofer", activo:true }).save(),
            new Role({ nombre: "colector", activo:true }).save(),
            new Role({ nombre: "avance", activo:true }).save(),
            new Role({ nombre: "organizador", activo:true }).save(),
            new Role({ nombre: "operador", activo: true }).save(),
         ]);
   
         console.log(values);
      }catch (error) {
         console.error(error);
      }      
   }

   async createTipoPagos() {
      try {
         const count = await TipoPago.estimatedDocumentCount();

         if (count > 0) return;


         const values = await Promise.all([
            new TipoPago({ nombre: "Efectivo USD", activo: true }).save(),
            new TipoPago({ nombre: "Efectivo Bs ", activo: true }).save(),
            new TipoPago({ nombre: "Binance", activo: true }).save(),
            new TipoPago({ nombre: "Pago movil ", activo: true }).save(),
            new TipoPago({ nombre: "Trasferencia Bs", activo: true }).save(),
            new TipoPago({ nombre: "Trasferencia Dollares", activo: true }).save(),
            new TipoPago({ nombre: "Otro exterior", activo: true }).save(),
         ]);

         console.log(values);
      } catch (error) {
         console.error(error);
      }
   }

   async createPaisCiudadEstado() {
      try {
         const count = await Pais.estimatedDocumentCount();

         if (count > 0) return;


         // 

           const newPais =  new Pais({
               idcode: 1,
               pais: 'VE',
               nombre: 'Venezuela',
               bandera: '🇻🇪',
               moneda: 'Bolívar',
               zonahoraria: 'GMT-4',
               idioma: 'Español',
               activo: 1,
               createdAt: new Date('2023-01-01'),
               updateAt: new Date('2023-01-01')
            })
            await newPais.save()

           const newEstado =  new Estado({
               paisid: newPais._id,
               pais: 'VE',
               estado: 'Lara',
               nombre: 'Estado Lara',
               activo: true,
               createdAt: new Date('2023-01-01'),
               updateAt: new Date('2023-01-01')
            })

            await newEstado.save()

           const newMun = new Municipio({
               paisid: newPais._id,
               estadoid:newEstado._id,
               nombre: 'Municipio Libertador',
               activo: true,
               createdAt: new Date('2023-01-01'),
               updateAt: new Date('2023-01-01')
            })
            await newMun.save()


            await  new Ciudad({
               paisid: newPais._id,
               estadoid: newEstado._id,
               municipioid: newMun._id,
               nombre: 'Caracas',
               activo: true,
               createdAt: new Date('2023-01-01'),
               updateAt: new Date('2023-01-01')
            }).save()



         // console.log(values);
      } catch (error) {
         console.error(error);
      }
   }

   async createEducacion() {
      try {
         const count = await Educacion.estimatedDocumentCount();

         console.log("createEducacion: ",count);
         

         if (count > 0) return;


         const values = await Promise.all([
            new Educacion({ nombre: "sin estudio", activo: true }).save(),
            new Educacion({ nombre: "Bachiller", activo: true }).save(),
            new Educacion({ nombre: "Universitario", activo: true }).save(),

         ]);

         console.log(values);
      } catch (error) {
         console.error(error);
      }
   }

   async createUser() {
      try {
         const superadmin = await Role.findOne({ nombre: 'superadmin' });
         const last = await User.findOne().sort({idcode: -1});
         const idcode = last ? last.idcode + 1 : 1; //generamos un idcode para el usuario   
         if (!superadmin) {
           console.error('El rol "superadmin" no existe. Crea los roles primero.');
           return;
         }
         const user = await User.findOne({correo: this.correo});
         if(user) {
            console.error('El usuario superadmin ya existe');
            return;
         }  
         const newUser = new User({
            idcode: idcode,
            nombre: this.nombre,
            telefono:"04122977680",
            direccion: this.direccion,
            fecha_nacimiento: "12-17-1971",
            dni: "V11535142",
            correo: this.correo,
            clave: this.clave,
            confirmado: this.confirmado,
            genero: "MASCULINO",
            fotoperfil:"fot.png",
            roles: [superadmin._id],
         });
         
         await newUser.save();
         console.log('Usuario superadmin creado exitosamente.');                
         
       } catch (error) {
         console.error('Error al crear usuario superadmin:', error);
       }     
   }
}
export default new initialConfig();