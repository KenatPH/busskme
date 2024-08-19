import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { activarReserva, create, deleteReserva, getReserva, getDataReservas, getDataReservasByOperador, getDataReservasBycliente } from "../controllers/reserva.controller";

const router = Router();

router.post('/create', checkAuth, create);
router.delete('/delete/:id', checkAuth, deleteReserva);
router.post('/active/:id', checkAuth, activarReserva);
router.get('/show', getDataReservas);
router.get('/show/:id', getReserva);
router.get('/showByServicio/:id', getDataReservasByOperador);
router.get('/showByCliente', checkAuth, getDataReservasBycliente);


export default router;