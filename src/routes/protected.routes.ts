/*
  Empresa         : Bioonix
  Aplicación      : Api de Dominó
  Módulo          : Archivo para definir las rutas protegidas por la autenticación
  Fecha creación  : 27 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Dominó
*/

import { Router } from "express";
import { home } from "../controllers/auth/auth.controller";
import passport from "passport";


const router = Router();


router.get('/special', (req, res)=>{   
   res.send("Bienvenido a la página de especial")
});

export default router;