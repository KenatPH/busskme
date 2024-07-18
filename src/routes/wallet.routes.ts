import { Router } from "express";
import { getWallet, getWalletByUser } from "../controllers/wallet.controller";

//import { validateCreate, validateUpdate } from '../validators/genero.validator';

const router = Router();

router.get('/show/:id', getWalletByUser);


export default router;