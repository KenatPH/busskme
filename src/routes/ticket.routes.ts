import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { checkAuth } from '../config/config.jwt';
import { createSimple, getDataTicket, getTicket, getTicketByUser } from "../controllers/ticket.controller";


const router = Router();

router.post('/create', checkAuth, createSimple);
// router.put('/update/:id', checkAuth, update);
// router.delete('/delete/:id', checkAuth, deleteBase);
// router.post('/active/:id', checkAuth, activarBase);
router.get('/show', getDataTicket);
router.get('/show/preferencial', checkAuth, getTicketByUser);
// router.get('/show/:id', getBase);
router.post('/pay', checkAuth, createSimple);


export default router;