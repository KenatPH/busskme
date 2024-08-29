
import { Router } from "express";
import { create, update, register, deleteOperador, getDataOperadores, getOperador, getOperadorByUserId, testmailOperador } from "../controllers/operador.controller";
import { checkAuth } from '../config/config.jwt';
import config from '../config/config';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware';

const multer = new MulterMiddleware(config.STORAGEAPI.imgsOperador, 'operador');

const upload = multer.getMiddleware().fields([{ name: 'fotoperfil', maxCount: 1 },
{ name: 'imagen_dni', maxCount: 1 },
{ name: 'imagen_licencia', maxCount: 1 },
{ name: 'imagen_cermed', maxCount: 1 }]);



const router = Router();

router.post('/create', function (req, res, next) {
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
}, register);

router.put('/update/:id', checkAuth, function (req, res, next) {
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
}, update);

router.delete('/delete/:id', checkAuth, deleteOperador);
router.get('/show', getDataOperadores);
router.get('/show/:id', getOperador);
router.get('/show/user/:id', getOperadorByUserId);
router.get('/correo', testmailOperador)


export default router;

