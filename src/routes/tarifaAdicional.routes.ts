import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { activarTarifaAdicional, create, deleteTarifaAdicional, getDataTarifaAdicional, getTarifaAdicional, update } from "../controllers/tarifaAdicional.controller";

const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteTarifaAdicional);
router.post('/active/:id', checkAuth, activarTarifaAdicional);
router.get('/show', getDataTarifaAdicional);
router.get('/show/:id', getTarifaAdicional);


export default router;