import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { activarTarifa, create, deleteTarifa, getTarifa, getDataTarifas, update } from "../controllers/tarifa.controller";

const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteTarifa);
router.post('/active/:id', checkAuth, activarTarifa);
router.get('/show', getDataTarifas);
router.get('/show/:id', getTarifa);


export default router;