import { Request, Response } from 'express';
import SolicitudServicioModel from '../models/solicitudDeServicio.model';
import Vehiculo from "../models/vehiculos/vehiculo.models";
import Operador from "../models/operador.models";
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { httpCode } from '../utils/httpStatusHandle';
import User from "../models/users.models";
import axios from "axios";
import utilsHandle from '../utils/utilsHandle';

// Crear una nueva solicitud de servicio
export const crearSolicitudServicio = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { ubicacionOrigen, ubicacionDestino } = req.body;

        const solicitanteid = req.user

        // Verificar si el usuario ya tiene solicitudes en espera
        const solicitudesEnEspera = await SolicitudServicioModel.find({
            solicitanteid: solicitanteid,
            $or: [{ estado: 'En espera' }, { estado: 'Aceptado' }, { estado: 'En viaje' }]
            
        });

        if (solicitudesEnEspera.length > 0) {
            // return res.status(400).json({ msg: 'El usuario ya tiene una solicitud en espera' });

            return res.status(httpCode[400].code).json({
                data_send: {},
                num_status: httpCode[400].code,
                msg_status: 'El usuario ya tiene una solicitud en espera.'
            });
        }



        // Crear la solicitud
        const nuevaSolicitud = new SolicitudServicioModel({
            solicitanteid,
            ubicacionOrigen,
            ubicacionDestino
        });

        // Guardar en la base de datos
        const solicitudCreada = await nuevaSolicitud.save();

        // return res.status(201).json({
        //     msg: 'Solicitud de servicio creada exitosamente',
        //     data: solicitudCreada
        // });

        return res.status(httpCode[200].code).json({
            data_send: solicitudCreada,
            num_status: httpCode[200].code,
            msg_status: 'Solicitud de servicio creada exitosamente.'
        });
    } catch (error) {

        console.log(error);

        
        return res.status(500).json({ msg: 'Error al crear la solicitud', error });
    }
};

// Modificar una solicitud de servicio
export const modificarSolicitudServicio = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { ubicacionOrigen, ubicacionDestino, estado, activo } = req.body;

        // Buscar y actualizar la solicitud
        const solicitudActualizada = await SolicitudServicioModel.findByIdAndUpdate(
            id,
            { ubicacionOrigen, ubicacionDestino, estado, activo },
            { new: true }
        );

        if (!solicitudActualizada) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }


        return res.status(httpCode[200].code).json({
            data_send: solicitudActualizada,
            num_status: httpCode[200].code,
            msg_status: 'Solicitud de servicio actualizada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al modificar la solicitud', error });
    }
};


// Obtener solicitud activa del solicitante
export const obtenerSolicitudActiva = async (req: Request, res: Response): Promise<Response> => {
    try {
        const solicitanteid = req.user as string;

        // Buscar la solicitud activa del solicitante
        const solicitudActiva:any = await SolicitudServicioModel.findOne({
            solicitanteid: solicitanteid,
            activo: true
        }).populate('aceptadoPor');



        if (!solicitudActiva) {
            return res.status(404).json({ msg: 'No se encontró ninguna solicitud activa para el solicitante' });
        }


        const operadodData = await Operador.findOne({ userid: solicitudActiva.aceptadoPor?._id })

        if (!operadodData) {
            return res.status(404).json({ msg: 'No se encontró ningun operador' });
        }


        const vehiculo = await Vehiculo.findOne({ choferid: operadodData?._id })
            .populate('userid choferid marcaid modeloid colorid', 'nombre color');
        ;

        if (!vehiculo){
            return res.status(404).json({ msg: 'No se encontró ningun vehiculo' });
        }

        

        return res.status(httpCode[200].code).json({
            data_send: { ...solicitudActiva.toObject(), operador:operadodData.toObject(), vehiculo },
            num_status: httpCode[200].code,
            msg_status: 'Solicitud activa encontrada.'
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al obtener la solicitud activa', error });
    }
};


// Eliminar una solicitud de servicio
export const eliminarSolicitudServicio = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        // Eliminar la solicitud
        const solicitudEliminada = await SolicitudServicioModel.findByIdAndDelete(id);

        if (!solicitudEliminada) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        return res.status(200).json({ msg: 'Solicitud de servicio eliminada exitosamente' });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al eliminar la solicitud', error });
    }
};

// Aceptar una solicitud de servicio
export const aceptarSolicitudServicio = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const  aceptadoPor:string  = req.user as string;

        // Validar que el usuario que acepta la solicitud exista (opcional)
        if (!Types.ObjectId.isValid(aceptadoPor)) {
            return res.status(httpCode[400].code).json({
                data_send: {},
                num_status: httpCode[400].code,
                msg_status: 'ID del usuario no válido'
            });
        }

        // Verificar si el usuario ya tiene otra solicitud aceptada
        const solicitudesAceptadas = await SolicitudServicioModel.find({
            aceptadoPor: aceptadoPor,
            estado: 'Aceptado'
        });

        if (solicitudesAceptadas.length > 0) {
            // return res.status(400).json({ msg: 'El usuario ya tiene una solicitud aceptada' });
            return res.status(httpCode[400].code).json({
                data_send:{},
                num_status: httpCode[400].code,
                msg_status: 'El usuario ya tiene una solicitud aceptada'
            });
        }

        // Verificar si el usuario existe (opcional, si se requiere verificar más detalles del usuario)
        const user = await User.findOne({ _id: aceptadoPor });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }


        // Buscar y actualizar el estado de la solicitud
        const solicitud = await SolicitudServicioModel.findById(id).populate('aceptadoPor');

        if (!solicitud) {
            // return res.status(404).json({ msg: 'Solicitud no encontrada' });
            return res.status(httpCode[404].code).json({
                data_send: {},
                num_status: httpCode[404].code,
                msg_status: 'Solicitud no encontrada'
            });
        }

        const operadodData = await Operador.findOne({ userid: aceptadoPor })

        if (!operadodData) {
            return res.status(404).json({ msg: 'No se encontró ningun operador' });
        }


        const vehiculo = await Vehiculo.findOne({ choferid: operadodData?._id })
            .populate('userid choferid marcaid modeloid colorid', 'nombre color');
        ;

        if (!vehiculo) {
            return res.status(404).json({ msg: 'No se encontró ningun vehiculo' });
        }

        if (solicitud.estado !== 'En espera') {
            return res.status(409).json({ msg: 'La solicitud ya fue aceptada o completada' });
        }

        solicitud.estado = 'Aceptado';
        solicitud.aceptadoPor = user?._id; 
        await solicitud.save();

        const solicitudActiva = await SolicitudServicioModel.findById(id).populate('aceptadoPor');

        if (!solicitudActiva) {
            // return res.status(404).json({ msg: 'Solicitud no encontrada' });
            return res.status(httpCode[404].code).json({
                data_send: {},
                num_status: httpCode[404].code,
                msg_status: 'Solicitud no encontrada'
            });
        }


        utilsHandle.llamarSocket({ userid: solicitud.solicitanteid, solicitud: { ...solicitudActiva.toObject(), operador: operadodData.toObject(), vehiculo },  action: 'Aceptada' }, 'solicitudDeServicio')


        return res.status(httpCode[200].code).json({
            data_send: solicitud,
            num_status: httpCode[200].code,
            msg_status: 'Solicitud de servicio aceptada exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al aceptar la solicitud', error });
    }
};

// Listar todas las solicitudes en estado 'En espera'
export const listarSolicitudesEnEspera = async (req: Request, res: Response): Promise<Response> => {
    try {
        const solicitudes = await SolicitudServicioModel.find({ estado: 'En espera' })
            .populate('solicitanteid', 'nombre')

        const respuesta:any[] = [] 
        for (const solicitud of solicitudes) {
            
            const responseGoogle = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
                params: {
                    origins: `${solicitud.ubicacionOrigen.latitud},${solicitud.ubicacionOrigen.longitud}`,
                    // origins: `${10.9707264},${-63.8418944}`,
                    destinations: `${solicitud.ubicacionDestino.latitud},${solicitud.ubicacionDestino.longitud}`,
                    // destinations: `${11.079022312234454},${-63.97048097723263}`,
                    key: `AIzaSyCaMOe0kIYCylSuG8XmPNZhvQXnoW5wDO4`,
                },
            });

            respuesta.push({ ...solicitud.toObject(), ubicacion: responseGoogle.data })
        }



        return res.status(httpCode[200].code).json({
            data_send: respuesta,
            num_status: httpCode[200].code,
            msg_status: 'Solicitudes en espera encontradas.'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al listar las solicitudes en espera', error });
    }
};

// Cancelar una solicitud de servicio
export const cancelarSolicitudServicio = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const usuarioId = req.user as string; // Asume que `req.user` contiene el ID del usuario que solicita la cancelación

        // Buscar la solicitud por ID
        const solicitud = await SolicitudServicioModel.findById(id);

        if (!solicitud) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        // Verificar que el estado actual permita la cancelación
        if (solicitud.estado === 'Finalizado') {
            return res.status(400).json({ msg: 'No se puede cancelar una solicitud finalizada' });
        }

        // Verificar que la solicitud pertenezca al solicitante o esté aceptada por el usuario que intenta cancelar
        if (solicitud.solicitanteid.toString() !== usuarioId && solicitud.aceptadoPor?.toString() !== usuarioId) {
            return res.status(403).json({ msg: 'No tienes permisos para cancelar esta solicitud' });
        }

        // Cambiar el estado de la solicitud a "Cancelado"
        solicitud.estado = 'Cancelado';
        solicitud.activo = false; // Marcar la solicitud como inactiva
        solicitud.finViaje = new Date(); // Registrar la cancelación como fin del proceso
        await solicitud.save();

        return res.status(httpCode[200].code).json({
            data_send: solicitud,
            num_status: httpCode[200].code,
            msg_status: 'Solicitud cancelada exitosamente.'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al cancelar la solicitud', error });
    }
};



// Iniciar el viaje
export const iniciarViaje = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        // Buscar y actualizar la solicitud
        const solicitud = await SolicitudServicioModel.findById(id);

        if (!solicitud) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        if (solicitud.estado !== 'Aceptado') {
            return res.status(409).json({ msg: 'La solicitud no está en estado aceptado' });
        }

        if (solicitud.inicioViaje) {
            return res.status(400).json({ msg: 'El viaje ya ha sido iniciado' });
        }

        solicitud.estado = 'En viaje';
        solicitud.inicioViaje = new Date(); // Registrar la hora de inicio
        await solicitud.save();

        return res.status(httpCode[200].code).json({
            data_send: solicitud,
            num_status: httpCode[200].code,
            msg_status: 'Viaje iniciado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al iniciar el viaje', error });
    }
};


// Finalizar el viaje
export const finalizarViaje = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        // Buscar y actualizar la solicitud
        const solicitud = await SolicitudServicioModel.findById(id);

        if (!solicitud) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        if (solicitud.estado !== 'En viaje') {
            return res.status(409).json({ msg: 'El viaje no está en curso' });
        }

        if (solicitud.finViaje) {
            return res.status(400).json({ msg: 'El viaje ya ha sido finalizado' });
        }

        solicitud.estado = 'Finalizado';
        solicitud.finViaje = new Date(); // Registrar la hora de finalización
        solicitud.activo = false; // Marcar la solicitud como no activa
        await solicitud.save();

        return res.status(httpCode[200].code).json({
            data_send: solicitud,
            num_status: httpCode[200].code,
            msg_status: 'Viaje finalizado exitosamente.'
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al finalizar el viaje', error });
    }
};
