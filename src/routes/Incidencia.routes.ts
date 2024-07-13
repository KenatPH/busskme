import { Router } from "express";
//import { validateCreate } from '../validators/categoria.validator';
import MulterMiddleware from '../middlewares/MulterPhotosMiddleware';
import { checkAuth } from '../config/config.jwt';
import { activar, create, deleteIncidencia, getDataIncidencia, update } from "../controllers/incidencia.controller";
import config from '../config/config';
const multer = new MulterMiddleware(config.STORAGEAPI.imgincidencia, 'incidencia');
const upload = multer.getMiddleware().single('imagen');

const router = Router();

router.post('/create',  checkAuth, function (req, res, next) {
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
}, create);
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
router.delete('/delete/:id', checkAuth, deleteIncidencia);
router.post('/active/:id', checkAuth, activar);
router.get('/show', getDataIncidencia);
router.get('/show/:id', getDataIncidencia);


export default router;