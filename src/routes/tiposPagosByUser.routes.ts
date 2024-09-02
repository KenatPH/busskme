import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { create, deleteTipopago, getDataTp, getTipoPago, update } from "../controllers/TiposPagosbyUser.controller";

const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteTipopago);
router.get('/show', getDataTp);
router.get('/show/:id', getTipoPago);


export default router;