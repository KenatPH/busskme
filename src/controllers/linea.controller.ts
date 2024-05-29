/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para crud de clubs
  Fecha creación  : 15 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import express, { Request, Response } from "express";
import Linea from "../models/linea.models";


//mostrar un club por su id
export const getLinea = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params; 
   const org = await Linea.findById(id);
   //validamos que exista la información
   try {
      if(!org){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No Organization found'
         });
      }
      return res.status(200).json({
         data_send: org,
         num_status: 0,
         msg_status: 'Club found successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 0,
         msg_status: 'There was a problem with the server, try again later '+error         
      })
   }
   
}

//mostrar todas las lineas
export const getDataLineas = async (req: Request, res: Response): Promise<Response> => {
   const org = await Linea.find();
   
   //validamos que exista la información
   try {
      if(org.length === 0){
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'No Organizations found'
         });
      }
      return res.status(200).json({
         data_send: org,
         num_status: 0,
         msg_status: 'Organizations found successfully!!!'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem with the server, try again later (club)'+error         
      })
   }
   
}

//crear una organización
export const create = async (req: Request, res: Response): Promise<Response> => {
   //declaramos los parametros recibidos en el req.body
   const { nombre, dni, paisid, estadoid, ciudadid, direccion, correo_org, telefono_org, logo, gerente, correo_gerente, telefono_gerente, instagram, web, tiktok, redx, facebook} = req?.body
      
   //validaciones en linea.validator.ts
   //verificar si ya existe un club con ése nombre
   const org = await Linea.findOne({nombre: nombre.toUpperCase()})
   if(org) {
      return res.status(409).json({
         data_send: "",         
         num_status:2,
         msg_status: 'The organization already exists!'         
      })
   }
      
   const newLinea = new Linea({       
      nombre: nombre.toUpperCase(),
      dni: dni.toUpperCase(),
      paisid,
      estadoid,
      ciudadid,
      direccion,
      correo_org : correo_org.toLowerCase(),
      telefono_org,
      logo,
      gerente           : gerente.toUpperCase(),
      correo_gerente    : correo_gerente.toLowerCase(),
      telefono_gerente,
      instagram, 
      web, 
      tiktok,
      redx, 
      facebook,  
   });

   try {
      
      await newLinea.save();
      
      return res.status(201).json(
      {  
         data_send: newLinea,         
         num_status:0,
         msg_status: 'Línea created successfully.'
      });
      
   } catch (error) {
      return res.status(400).json({
         message: error
      })
   }
}


export const update = async (req: Request, res: Response): Promise<Response> => {
   try {
      
      const { id } = req.params; 
      const { nombre, direccion, correo_org, telefono_org, logo, gerente, correo_gerente, telefono_gerente, instagram, web, tiktok, redx, facebook} = req.body;

      // Find the organization by Id
      const org = await Linea.findById(id);

      if (!org) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Organization not found'
         });
      }

      // Update the organization properties
      org.nombre            = nombre.toUpperCase(); 
      org.direccion         = direccion,
      org.correo_org       = correo_org.toLowerCase(),
      org.telefono_org     = telefono_org,
      org.logo              = logo,
      org.gerente           = gerente.toUpperCase(),
      org.correo_gerente    = correo_gerente.toLowerCase(),
      org.telefono_gerente  = telefono_gerente;
      org.instagram         = instagram; 
      org.web               = web; 
      org.tiktok            = tiktok;
      org.redx              = redx; 
      org.facebook          = facebook;           
      
      
      // Save the updated club
      
      await org.save();

      return res.status(200).json({
         data_send: {                  
            "nombre"             : org.nombre.toUpperCase(), 
            "direccion"          : org.direccion, 
            "correo_org"        : org.correo_org.toLowerCase(), 
            "telefono_org"      : org.telefono_org, 
            "logo"               : org.logo,
            "gerente"            : org.gerente.toUpperCase(), 
            "correo_gerente"     : org.correo_gerente.toLowerCase(), 
            "telefono_gerente"   : org.telefono_gerente,
            "instagram"          : org.instagram, 
            "web"                : org.web, 
            "tiktok"             : org.tiktok,
            "redx"               : org.redx, 
            "facebook"           : org.facebook,                  
         },
         num_status: 0,
         msg_status: 'Organization updated successfully'
      });
   } catch (error) {
      return res.status(500).json({
         data_send: "",
         num_status: 501,
         msg_status: 'There was a problem trying to modify the country, try again later (Club)'+error         
      })
   }
}

export const deleteLinea = async (req: Request, res: Response): Promise<Response> => {
   try {
      const { id } = req.params;

      // Find the category by id and Delete the category      
      const org = await Linea.findByIdAndDelete(id);

      if (!org) {
         return res.status(404).json({
            data_send: "",
            num_status: 6,
            msg_status: 'Club not found'
         });
      }else{
         return res.status(200).json({
            //data_send:user,
            num_status: 0,
            msg_status: 'Club deleted successfully'
         });
      }
                  
   } catch (error) {
      return res.status(500).json({
         message: error
      });
   }
}
