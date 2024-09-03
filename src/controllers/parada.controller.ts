

/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de paradas
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import Parada from "../models/parada.models";
import Itinerario from "../models/itinerario.model"
import Servicio from "../models/servicio.models"
import Reserva from "../models/reserva.models";
import mongoose from "mongoose";
import { paradaSchema } from "../schemas/parada.schema";
import { httpCode } from "../utils/httpStatusHandle";
import {ObjectId} from 'mongodb';
import { serve } from "swagger-ui-express";
import axios from "axios";


export const getParada = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id is invalid'
      });
   }
   const dat = await Parada.findOne({_id: id})
   .populate('rutaid','nombre')
   .populate('municipioid','paisid estadoid nombre');
   
   try {
      if(!dat){
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'No parada found'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: dat,
         num_status: httpCode[200].code,
         msg_status: 'Parada found successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }
   
}

export const getDataParadas = async (req: Request, res: Response): Promise<Response> => {
   const dat = await Parada.find()
   .populate('rutaid','nombre')
   .populate('municipioid','paisid estadoid nombre');
      
   try {
      if(dat.length === 0){
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'No existen paradas'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: dat,
         num_status: httpCode[200].code,
         msg_status: 'Parada found successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }
   
}

export const getDataParadasByNombre = async (req: Request, res: Response): Promise<Response> => {
   const {filtro} = req.params
   const dat = await Parada.find({ nombre: { $regex: `.*${filtro}.*`, $options: 'i' }, activo:true})
   .populate('rutaid','nombre')
   .populate('municipioid','paisid estadoid nombre');
      
   try {
      if(dat.length === 0){
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'No data found'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: dat,
         num_status: httpCode[200].code,
         msg_status: 'Data found successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }   
}

export const getDataParadasByRuta = async (req: Request, res: Response): Promise<Response> => {
   const {rutaid} = req.params
   const dat = await Parada.find({ rutaid: rutaid , activo:true})
   .populate('rutaid')
   .populate('municipioid','paisid estadoid nombre');

   const itin = await Itinerario.find({rutaid:rutaid},{_id:1})
   
   const arregloItinerarios  =  itin.map((it)=>{ return it._id})
   
   const Servs = await Servicio.find({ itinerarioid: { $in: arregloItinerarios }, finalizado: false }).populate('itinerarioid')

   try {
      if(dat.length === 0){
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'No data found'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: { paradas:dat, servicios:Servs },
         num_status: httpCode[200].code,
         msg_status: 'Data found successfully'
      });
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }   
}

export const getDataServiciosByParada = async (req: Request, res: Response): Promise<Response> => {
   const { id, userLat, userLng } = req.params;
   if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id is invalid'
      });
   }
   
   try {
      const dat = await Parada.findById(id)

      if (!dat) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'no existen paradas'
         });
      }

      const itin = await Itinerario.find({ rutaid: dat.rutaid }, { _id: 1 })

      if (itin.length === 0) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'Itinerario no encontrado'
         });
      }

      const arregloItinerarios = itin.map((it) => { return it._id })

      const Servs = await Servicio.find({ itinerarioid: { $in: arregloItinerarios }, finalizado: false }).populate({
         path: 'itinerarioid',
         populate: [
            {
               path: 'vehiculoid',
               select:'colorid modeloid marcaid codigo_unidad',
               populate: [
                  { path: 'colorid', select:'color' },
                  { path: 'modeloid', select: 'nombre' },
                  { path: 'marcaid', select: 'nombre' }
               ]
            }, 
            { path: 'choferid colectorid baseid rutaid', select:'nombre genero fotoperfil'},
         ]
      })

      if (Servs.length === 0) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'Servicios no encontrados'
         });
      }

      const data:any = []

      for (let i = 0; i < Servs.length; i++) {

         let distancia:any 
         if ((userLat !== null && userLat !== undefined && userLat !== "" && userLat !== "null") &&
            (userLng !== null && userLng !== undefined && userLng !== "" && userLng !== "null")  ) {
            const result  = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
               params: {
                  origins: `${Servs[i].latitud},${Servs[i].longitud}`,
                  // origins: `${10.9707264},${-63.8418944}`,
                  destinations: `${userLat},${userLng}`,
                  // destinations: `${11.079022312234454},${-63.97048097723263}`,
                  key: `AIzaSyCaMOe0kIYCylSuG8XmPNZhvQXnoW5wDO4`,
               },
            });

            if(result && result.data){
               distancia = result.data
            }
         }

         


         const count = await Reserva.find({ $and: [{ servicioid: Servs[i]._id }, { estado: "Abordo" } ]});
         data.push({ servicioid: Servs[i]._id, pasajeros_abordo: count.length, distancia: distancia })
      }



      return res.status(httpCode[200].code).json({
         data_send: { Servs, pasajeros_abordo: data } ,
         num_status: httpCode[200].code,
         msg_status: 'Servicios encontrados con éxito'
      });
   } catch (error) {
      console.log(error);
      
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '
      })
   }
}

export const create = async (req: Request, res: Response): Promise<Response> => {

   const { rutaid,municipioid,nombre,latitud,longitud,distancia, orden} = req?.body   
   if(rutaid === null || rutaid === undefined || !rutaid || !ObjectId.isValid(rutaid)
   ||municipioid === null || municipioid === undefined || !municipioid || !ObjectId.isValid(municipioid)){
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'Id es inválido'
      });
   } 
   if(!rutaid || rutaid === null || rutaid =="" || rutaid == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo rutaid es obligatorio, verifique.'         
      });
   }
   if(!municipioid || municipioid === null || municipioid =="" || municipioid == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo municipioid es obligatorio, verifique.'         
      });
   }
   if(!nombre || nombre === null || nombre =="" || nombre == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo nombre es obligatorio, verifique.'         
      });
   } 
   if(!latitud || latitud === null || latitud =="" || latitud == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo latitud es obligatorio, verifique.'         
      });
   }
   if(!longitud || longitud === null || longitud =="" || longitud == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo longitud es obligatorio, verifique.'         
      });
   }
   if(!distancia || distancia === null || distancia =="" || distancia == undefined){
      return res.status(httpCode[409].code).json({
         data_send: "",         
         num_status:httpCode[409].code,
         msg_status: 'El campo distancia es obligatorio, verifique.'         
      });
   }
   if (!orden || orden === null || orden == "" || orden == undefined) {
      return res.status(httpCode[409].code).json({
         data_send: "",
         num_status: httpCode[409].code,
         msg_status: 'El campo orden es obligatorio, verifique.'
      });
   }
   const qr ="";       
   const newParada = new Parada({
      rutaid:rutaid,
      municipioid:municipioid,            
      nombre: nombre.toUpperCase(),
      latitud:latitud,
      longitud:longitud,
      distancia:distancia,
      cod_qr:qr, 
      orden
   });

   try {
      
      await newParada.save();
      
      return res.status(httpCode[201].code).json(
      {  
         data_send: newParada,         
         num_status:httpCode[201].code,
         msg_status: 'Parada creada satisfactoriamente.'
      });
      
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem with the server, try again later '+error
      })
   }
}

export const update = async (req: Request, res: Response): Promise<Response> => {
   try {
                  
      const id = req.params.id;
      const { rutaid,municipioid,nombre,latitud,longitud,distancia, orden} = req?.body 


      
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      } 
        

      if(!rutaid || rutaid === null || rutaid ==="" || rutaid === undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo rutaid es obligatorio, verifique.'         
         });
      }
      if(!municipioid || municipioid === null || municipioid =="" || municipioid == undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo municipioid es obligatorio, verifique.'         
         });
      }
      if(!nombre || nombre === null || nombre =="" || nombre == undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo nombre es obligatorio, verifique.'         
         });
      } 
      if(!latitud || latitud === null || latitud =="" || latitud == undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo latitud es obligatorio, verifique.'         
         });
      }
      if(!longitud || longitud === null || longitud =="" || longitud == undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo longitud es obligatorio, verifique.'         
         });
      }
      if(!distancia || distancia === null || distancia =="" || distancia == undefined){
         return res.status(httpCode[409].code).json({
            data_send: "",         
            num_status:httpCode[409].code,
            msg_status: 'El campo distancia es obligatorio, verifique.'         
         });
      }
      if (!orden || orden === null || orden == "" || orden == undefined) {
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El campo orden es obligatorio, verifique.'
         });
      }
      
      const qr = "";
      const updrut = await Parada.findOneAndUpdate({_id: id}, 
         {$set: {
            rutaid: rutaid,
            municipioid: municipioid,                        
            nombre   : nombre.toUpperCase(),            
            latitud:latitud,
            longitud:longitud,
            distancia:distancia,
            cod_qr:qr, 
            orden:orden           
         }}, 
         {new: true});
      if(!updrut) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'No Parada found'
         });
      }
      return res.status(httpCode[200].code).json({
         data_send: {
            updrut            
         },
         num_status: httpCode[200].code,
         msg_status: 'Ruta modificada con éxito'
      });
                              
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem trying to modify the route, try again later (ruta)'         
      })
   }
}

export const deleteParada = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      } 
      const dat = await Parada.findById(id);
      if (!dat) {
         return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Parada no encontrada.'
         });
      }
      
      dat.activo = false;

      await dat.save();

      return res.status(httpCode[200].code).json({
         data_send: {            
            "nombre": dat.nombre.toUpperCase(), 
            "activo": dat.activo,
            "aprobado": dat.aprobado             
         },
         num_status: httpCode[200].code,
         msg_status: 'Parada eliminada con éxito.'
      });
                        
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem trying to modify the route, try again later (ruta)'         
      });
   }
}

export const activarParada = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;
      
      if(id === null || id === undefined || !id || !ObjectId.isValid(id)){
         return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Id is invalid'
         });
      } 
      const dat = await Parada.findById(id);
      if (!dat) {
         return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'Parada no encontrada.'
         });
      }
          
      dat.activo = true;
          
      await dat.save();

      return res.status(httpCode[200].code).json({
         data_send: {            
            "parada": dat.nombre.toUpperCase(), 
            "activo": dat.activo,
            "aprobado": dat.aprobado             
         },
         num_status: httpCode[200].code,
         msg_status: 'Parada activada con éxito.'
      });
                        
   } catch (error) {
      return res.status(httpCode[500].code).json({
         data_send: "",
         num_status: httpCode[500].code,
         msg_status: 'There was a problem trying to modify the route, try again later (ruta)'         
      });
   }
}
