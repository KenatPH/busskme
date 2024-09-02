
import express, { Request, Response } from "express";
import Pago from "../models/pago.models";
import Reserva from "../models/reserva.models";
import Tarifa from "../models/tarifa.models";
import Wallet from "../models/wallet.model";
import Ticket from "../models/ticket.models";
import Vehiculo from "../models/vehiculos/vehiculo.models";
import Itinerario from "../models/itinerario.model";
import Servicio from "../models/servicio.models";
import Parada from "../models/parada.models";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";
import { crearNotificacion } from "./notificacion.controller";

export const getReserva = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Reserva.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Reserva no enconttrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Reserva encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataReservas = async (req: Request, res: Response): Promise<Response> => {
    const data = await Reserva.find();

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Reserva no enconttrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Reserva encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataReservasByOperador = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const data = await Reserva.find({servicioid:id , activo:true}).populate('userid', 'nombre genero').populate('paradaid', 'nombre');


    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Reserva no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Reserva encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataReservasBycliente = async (req: Request, res: Response): Promise<Response> => {
    const userid = req.user
    
    const data = await Reserva.findOne({ userid, activo: true }).populate('paradadestinoid paradaorigenid', 'nombre').populate({
            path: 'servicioid',
            populate: {
                path: 'itinerarioid',
                populate: [
                    {
                        path: 'vehiculoid',
                        select: 'colorid modeloid marcaid',
                        populate: [
                            { path: 'colorid', select: 'color' },
                            { path: 'modeloid', select: 'nombre' },
                            { path: 'marcaid', select: 'nombre' }
                        ]
                    },
                    { path: 'choferid colectorid baseid rutaid', select: 'nombre genero fotoperfil' },
                ]
            }
    });

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Reserva no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Reserva encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const create = async (req: Request, res: Response): Promise<Response> => {

    const { servicioid, paradaorigenid, paradadestinoid } = req?.body

    console.log(req.body);
    
    const userid = req.user

    if (!ObjectId.isValid(servicioid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'El parametro servicioid , es obligatorio.'
        })
    }

    if (!ObjectId.isValid(paradaorigenid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'El parametro paradaorigenid, es obligatorio.'
        })
    }

    if (!ObjectId.isValid(paradadestinoid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'El parametro paradaorigenid, es obligatorio.'
        })
    }

    try {

        const Servs: any = await Servicio.findById(servicioid).populate({
            path: 'itinerarioid',
            populate: [
                {
                    path: 'vehiculoid',
                    select: 'colorid modeloid marcaid codigo_unidad',
                    populate: [
                        { path: 'colorid', select: 'color' },
                        { path: 'modeloid', select: 'nombre' },
                        { path: 'marcaid', select: 'nombre' }
                    ]
                },
                { path: 'choferid colectorid baseid rutaid', select: 'nombre genero fotoperfil' },
            ]
        })


        if (!Servs) {
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'servicio no encontrado'
            });
        }


        const paradaOrigen = await Parada.findOne({ _id: paradaorigenid })
        
        if (!paradaOrigen){
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'parada origen no encontrada'
            });
        }

        const paradaDestino = await Parada.findOne({ _id: paradadestinoid })

        if (!paradaDestino) {
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'parada destino no encontrada'
            });
        }


        const newReserva = new Reserva({
            userid, servicioid, paradaorigenid, paradadestinoid
        });


        await newReserva.save();


        const titulo1 = "Un cliente a reservado";
        const cuerpo = `Un cliente a reservado desde la parada ${paradaOrigen.nombre}`;
        const link = "";

        await crearNotificacion(titulo1, cuerpo, link, Servs.itinerarioid.choferid._id);
        await crearNotificacion(titulo1, cuerpo, link, Servs.itinerarioid.colectorid._id);


        return res.status(httpCode[201].code).json(
            {
                data_send: { newReserva, Servs },
                num_status: httpCode[201].code,
                msg_status: 'Reserva creada satisfactoriamente.'
            });

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const consolidarReserva = async (req: Request, res: Response): Promise<Response> => {
    const { codigo_unidad } = req.body
    try {
        const userid = req.user

        if (codigo_unidad) {
            if (codigo_unidad === "" || codigo_unidad === undefined) {
                return res.status(httpCode[404].code).json({
                    data_send: [],
                    num_status: httpCode[404].code,
                    msg_status: 'Reserva no encontrada o no suminitro codigo de unidad'
                });
            }
        }


        const reserva:any = await Reserva.findOne({ userid, activo: true }).populate('paradadestinoid paradaorigenid', 'nombre').populate({
            path: 'servicioid',
            populate: {
                path: 'itinerarioid',
                populate: [
                    {
                        path: 'vehiculoid',
                        select: 'colorid modeloid marcaid codigo_unidad',
                        populate: [
                            { path: 'colorid', select: 'color' },
                            { path: 'modeloid', select: 'nombre' },
                            { path: 'marcaid', select: 'nombre' }
                        ]
                    },
                    { path: 'choferid colectorid baseid rutaid', select: 'nombre genero fotoperfil' },
                ]
            }
        });

        

        if (!reserva) {
            return res.status(httpCode[404].code).json({
                data_send: [],
                num_status: httpCode[404].code,
                msg_status: 'Reserva no encontrada'
            });
        }
        console.log(reserva);
        

        let servicioid = reserva.servicioid

        let choferId = reserva.servicioid.itinerarioid.choferid._id
        let vehiculo: any
        let data
        
        if (codigo_unidad.toUpperCase() !== reserva.servicioid.itinerarioid.vehiculoid.codigo_unidad.toUpperCase()) {
            const vehi = await Vehiculo.findOne({ codigo_unidad: codigo_unidad })

            if (!vehi) {
                return res.status(httpCode[404].code).json({
                    data_send: [],
                    num_status: httpCode[400].code,
                    msg_status: 'Vehículo no enconttrado'
                });
            }

            const itin = await Itinerario.find({ vehiculoid: vehi._id })

            if (itin.length === 0) {
                return res.status(httpCode[404].code).json({
                    data_send: "",
                    num_status: httpCode[404].code,
                    msg_status: 'No Itinerario found'
                });
            }

            const arregloItinerarios = itin.map((it) => { return it._id })

            const Servs = await Servicio.findOne({ itinerarioid: { $in: arregloItinerarios }, finalizado: false }).populate({
                path: 'itinerarioid',
                populate: [
                    {
                        path: 'vehiculoid',
                        select: 'colorid modeloid marcaid codigo_unidad',
                        populate: [
                            { path: 'colorid', select: 'color' },
                            { path: 'modeloid', select: 'nombre' },
                            { path: 'marcaid', select: 'nombre' }
                        ]
                    },
                    { path: 'choferid colectorid baseid rutaid', select: 'nombre genero fotoperfil' },
                ]
            })

            if (!Servs) {
                return res.status(httpCode[404].code).json({
                    data_send: [],
                    num_status: httpCode[404].code,
                    msg_status: 'servicio no enconttrado'
                });
            }
            servicioid = Servs._id
            choferId = vehiculo.choferid

            reserva.activo =  false;
            await reserva.save()

            const newReserva = new Reserva({
                userid, servicioid, paradaorigenid: reserva.paradaorigenid, paradadestinoid:reserva.paradadestinoid, estado:'Abordo'
            });

            await newReserva.save();

            data = newReserva

        }else{

            reserva.estado = 'Abordo';
            await reserva.save()
            data = reserva
        }


        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Reserva ya se encuentra con estatus activa y abordo.'
        });

    } catch (error) {
        console.log(error)
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const deleteReserva = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Reserva.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Reserva no encontrada.'
            });
        } else {
            if (data.activo === true) {
                data.activo = false;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Reserva borrada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Reserva ya se encuentra con estatus eliminada.'
                });
            }

        }

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const activarReserva = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Reserva.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Reserva no encontrada.'
            });
        } else {
            if (data.activo === false) {
                data.activo = true;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Reserva activada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Reserva ya se encuentra con estatus activa.'
                });
            }

        }

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

