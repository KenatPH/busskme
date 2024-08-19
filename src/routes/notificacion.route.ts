import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { activarBase, create, deleteBase, getBase, getDataBases, update } from "../controllers/base.controller";
import { getListNotificacion, getListNotificacionAdmin, updateLeida } from "../controllers/notificacion.controller";

const router = Router();

router.get('/getlist/:pag/:id', getListNotificacion);
router.get('/getlistAdmin/:pag', getListNotificacionAdmin);
router.get('/get/:id', getListNotificacion);
router.post('/update/leida/:id', updateLeida);
export default router;