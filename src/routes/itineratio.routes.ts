import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { activar, create, deleteItinerario, getDataItinerario, getDataItinerarioByChofer, update } from "../controllers/itinerario.controller";

const router = Router();

router.post('/create', checkAuth, create);
router.put('/update/:id', checkAuth, update);
router.delete('/delete/:id', checkAuth, deleteItinerario);
router.post('/active/:id', checkAuth, activar);
router.get('/show', getDataItinerario);
router.get('/show/byChoferId/:id', getDataItinerarioByChofer);
router.get('/show/:id', getDataItinerario);


export default router;