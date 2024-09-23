import { Router } from "express";
import { checkAuth } from '../config/config.jwt';
import { create, activarServicio, getDataServicio, actualizaUbicacion, finalizarServicio, getServicio, getServicioActivoByUser, getServicioActivoByCodigoUnidad, createTaxi, actualizaUbicacionTaxi, getServicioActivoByUserTaxi } from "../controllers/servicio.controller";


const router = Router();

router.post('/create', create);
router.post('/create/taxi', checkAuth, createTaxi);
router.post('/active/:id', activarServicio);
router.post('/finalizar/:id', finalizarServicio);
router.get('/show', getDataServicio);
router.get('/show/:id', getServicio);
router.post('/ubicacion/:id', actualizaUbicacion);
router.post('/ubicacion/taxi/:id', actualizaUbicacionTaxi);
router.get('/show/byUserid/:id', getServicioActivoByUser);
router.get('/show/byUserid/taxi/:id', getServicioActivoByUserTaxi);
router.get('/show/byCodigoUnidad/:codigo', getServicioActivoByCodigoUnidad);


export default router;