import { Router } from 'express';
import { checkAuth } from '../config/config.jwt';
import { aceptarSolicitudServicio, cancelarSolicitudServicio, crearSolicitudServicio, eliminarSolicitudServicio, finalizarViaje, iniciarViaje, listarSolicitudesEnEspera, modificarSolicitudServicio, obtenerSolicitudActiva, obtenerSolicitudActivaAceptada } from '../controllers/solicitudDeServicio.controller';

const router = Router();

// Ruta para crear una nueva solicitud de servicio
router.post('/crear', checkAuth, crearSolicitudServicio);

// Ruta para modificar una solicitud de servicio
router.put('/modificar/:id', checkAuth, modificarSolicitudServicio);

// Ruta para eliminar una solicitud de servicio
router.delete('/eliminar/:id', checkAuth, cancelarSolicitudServicio);

// Ruta para aceptar una solicitud de servicio
router.put('/aceptar/:id', checkAuth,  aceptarSolicitudServicio);

// Ruta para iniviar viaje de una solicitud de servicio
router.put('/iniciarViaje/:id', checkAuth, iniciarViaje);

// Ruta para iniviar viaje de una solicitud de servicio
router.put('/finalizarViaje/:id', checkAuth, finalizarViaje);

// Ruta para listar todas las solicitudes que están en estado 'En espera'
router.get('/en-espera', listarSolicitudesEnEspera);

// Ruta para optener solicitudes que están activas 
router.get('/activa', checkAuth, obtenerSolicitudActiva);

// Ruta para optener solicitudes que están activas 
router.get('/activa/chofer', checkAuth, obtenerSolicitudActivaAceptada);

export default router;
