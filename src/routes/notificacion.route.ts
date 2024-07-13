import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { activarBase, create, deleteBase, getBase, getDataBases, update } from "../controllers/base.controller";
import { getListNotificacion } from "../controllers/notificacion.controller";

const router = Router();

router.get('/getlist/:pag/:id', getListNotificacion);
router.get('/get/:id', getListNotificacion);

export default router;