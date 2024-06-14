/*
  Empresa         : Bioonix
  Aplicación      : Api de Dominó
  Módulo          : Archivo para definir las rutas de acciones sobre paises (CRUD)
  Fecha creación  : 05 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Dominó
*/

import { Router } from "express";
import { create, update, deletePais, getDataPaises, getPais } from "../controllers/pais.controller";
import passport from 'passport';
import {checkAuth} from '../config/config.jwt';

const router = Router();


router.post('/create', checkAuth, create);
router.put('/update/:id',checkAuth, update);
router.delete('/delete/:id', checkAuth,deletePais);

/**
 * @swagger
 * /pais/show:
 *    get:
 *      sumary: Obtener un listado de países
 *      security:
 *        - apiAuth:[]
 *      tags:
 *        - Pais 
 *      responses:
 *        200:
 *          description: Listado de países obtenidos con éxito
 *        401:
 *          description: No autorizado
 *        500:
 *          description: Error interno del servidor
 */
router.get('/show', getDataPaises);
router.get('/show/:id', getPais);


export default router;