import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { deleteReporteOperativo, getReporteOperativo, getDataReporteOperativos, updateNotaReporteOperativo  } from "../controllers/reporteOperativo.controller";

const router = Router();


router.delete('/delete/:id', checkAuth, deleteReporteOperativo);
router.get('/show', getDataReporteOperativos);
router.get('/show/:id', getReporteOperativo);
router.put('/updateNota/:id', updateNotaReporteOperativo);

export default router;