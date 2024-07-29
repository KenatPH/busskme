import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { createSimple, getDataTicket, getTicket } from "../controllers/ticket.controller";


const router = Router();

router.post('/create', checkAuth, createSimple);
// router.put('/update/:id', checkAuth, update);
// router.delete('/delete/:id', checkAuth, deleteBase);
// router.post('/active/:id', checkAuth, activarBase);
router.get('/show', getDataTicket);
// router.get('/show/:id', getBase);


export default router;