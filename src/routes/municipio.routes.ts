/*
  Empresa         : Bioonix
  Aplicación      : Api de Busskm
  Módulo          : Archivo para definir las rutas de acciones sobre municipios (CRUD)
  Fecha creación  : 26 de Abr del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Busskm
*/

import { Router } from "express";
import { create, update, deleteMunicipio, getDataMunicipios, getMunicipio, getMunicipiosPaisEdo } from "../controllers/municipio.controller";

const router = Router();

router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteMunicipio);
router.get('/show', getDataMunicipios);
router.get('/show/:id', getMunicipio);
router.post('/pais/estado/show', getMunicipiosPaisEdo);
export default router;