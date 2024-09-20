import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { deleteTipoPreferencial, activarTipoPreferencial, getDataTipoPreferencial, getTipoPreferencial, create, update } from "../controllers/tipoPreferencial.controller";


const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteTipoPreferencial);
router.post('/active/:id', checkAuth, activarTipoPreferencial);
router.get('/show', getDataTipoPreferencial);
router.get('/show/:id', getTipoPreferencial);


export default router;