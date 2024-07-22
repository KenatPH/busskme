import { Router } from "express";
import { getWallet, getWalletByUser, recargaWallet } from "../controllers/wallet.controller";

//import { validateCreate, validateUpdate } from '../validators/genero.validator';

const router = Router();

router.get('/show/:id', getWalletByUser);

router.put('/recarga/:id', recargaWallet);

export default router;