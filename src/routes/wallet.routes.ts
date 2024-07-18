import { Router } from "express";
import { getWallet } from "../controllers/wallet.controller";

//import { validateCreate, validateUpdate } from '../validators/genero.validator';

const router = Router();

router.get('/show/:id', getWallet);


export default router;