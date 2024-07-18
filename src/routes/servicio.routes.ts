import { Router } from "express";
import { create, activarServicio, getDataServicio } from "../controllers/servicio.controller";


const router = Router();

router.post('/create', create);
router.post('/active/:id', activarServicio);
router.get('/show', getDataServicio);

// router.get('/show/:id', getParada);




export default router;