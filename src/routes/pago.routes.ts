import { Router } from "express";
import { checkAuth } from '../config/config.jwt';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware'
import config from '../config/config';
import { registarPago, getListPagos, getPago, validarPago, getListPagosByUser, pagarViaje, pagarViajeTaxi } from "../controllers/pago.controller";


const router = Router();
const multer = new MulterMiddleware(config.STORAGEAPI.imgmetodopago, "metodopago");
// const upload = multer.getMiddleware().single('imagen');

const upload = multer.getMiddleware().fields([{ name: 'imagen', maxCount: 1 }]);


router.post('/create', checkAuth, function (req, res, next) {
    upload(req, res, (err) => {
        console.log(req.files);
        
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

// router.post('/create', multer.getMiddleware().single('imagen'), registarPago);
router.post('/viaje', checkAuth, pagarViaje);
router.post('/viaje/taxi', checkAuth, pagarViajeTaxi);
router.post('/validar/:id', validarPago);
router.get('/show', getListPagos);
router.get('/show/:id', getPago);
router.get('/show/byUserid/:id', getListPagosByUser);

export default router;