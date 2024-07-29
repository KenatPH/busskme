import { Router } from "express";
import { create, activarServicio, getDataServicio, actualizaUbicacion, finalizarServicio, getServicio } from "../controllers/servicio.controller";


const router = Router();

router.post('/create', create);
router.post('/active/:id', activarServicio);
router.post('/finalizar/:id', finalizarServicio);
router.get('/show', getDataServicio);
router.get('/show/:id', getServicio);
router.post('/ubicacion/:id', actualizaUbicacion);
// router.get('/show/:id', getParada);




export default router;