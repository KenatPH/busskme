import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { activar, create, deleteIncidencia, getDataIncidencia, update } from "../controllers/incidencia.controller";

const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteIncidencia);
router.post('/active/:id', checkAuth, activar);
router.get('/show', getDataIncidencia);
router.get('/show/:id', getDataIncidencia);


export default router;