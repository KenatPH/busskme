import { Router } from "express";
import { checkAuth } from '../config/config.jwt';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware'
import config from '../config/config';
import { registarPago, getListPagos, getPago, validarPago } from "../controllers/pago.controller";


const router = Router();
const multer = new MulterMiddleware(config.STORAGEAPI.imgmetodopago, "metodopago");
const upload = multer.getMiddleware().single('imagen');


router.post('/create', checkAuth, function (req, res, next) {
    upload(req, res, (err) => {

        if (err) {
            return res.status(409).json({
                data_send: "",
                num_status: 409,
                msg_status: err.message
            });
        } else if (err) {
            return res.status(500).json({
                data_send: "",
                num_status: 500,
                msg_status: err.message
            });
        }
        next();
    })
}, registarPago);

router.post('/validar/:id', checkAuth, validarPago);
router.get('/show', getListPagos);
router.get('/show/:id', getPago);
export default router;