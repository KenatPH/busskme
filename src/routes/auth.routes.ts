/*
  Empresa         : Bioonix
  Aplicación      : Api de Dominó
  Módulo          : Archivo para definir las rutas de authority para la autenticación de usuarios
  Fecha creación  : 25 de Mar del 2024
  Modificado el   :
  Programador     : JLRAMIREZ
  Colaboración    :
  Descripción     : Api para enviar y manejar la información de Dominó
*/

import { Router } from "express";
import { login, confirmAccount, validatedAccount, modifyPassword, resetPassword } from "../controllers/auth/auth.controller";
import { fbkLogin, fbkCallback, fbkLogout } from "../controllers/auth/fbk.controller.auth";
import { validateLogin } from '../validators/auth.validator';

const router = Router();



router.post('/login', login);
router.post('/modify-password', modifyPassword);
router.post('/reset-password', resetPassword);
router.post('/confirm-account', confirmAccount);
router.get('/validate-account', validatedAccount);


// routes facebook login

/* router.get("/facebook", fbkLogin);

router.get(
  "/facebook/callback",
  fbkCallback
);

router.get('/facebook/logout',fbkLogout); */

export default router;