import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import { getETA } from "../controllers/ETA.controller";

const router = Router();

router.get('/show/:originLat/:originLng/:userLat/:userLng', getETA);


export default router;