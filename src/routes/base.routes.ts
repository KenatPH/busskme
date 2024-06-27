import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { activarBase, create, deleteBase, getBase, getDataBases, update } from "../controllers/base.controller";

const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteBase);
router.post('/active/:id', checkAuth, activarBase);
router.get('/show', getDataBases);
router.get('/show/:id', getBase);


export default router;