
import express, { Request, Response } from "express";
import Servicio from "../models/servicio.models";
import Vehiculo from "../models/vehiculos/vehiculo.models"
import Itinerario from "../models/itinerario.model";
import mongoose from "mongoose";
import { paradaSchema } from "../schemas/parada.schema";
import { httpCode } from "../utils/httpStatusHandle";
import { ObjectId } from 'mongodb';
import utilsHandle from "../utils/utilsHandle";



export const getDataServicio = async (req: Request, res: Response): Promise<Response> => {
    const dat = await Servicio.find()
        .populate({
            path: 'itinerarioid',
            select: 'choferid colectorid',
            populate: {
                path: 'userid',
                select: 'nombre'
            },
        })

    try {
        if (dat.length === 0) {
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'No servicio found'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: dat,
            num_status: httpCode[200].code,
            msg_status: 'servicio found successfully'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        })
    }

}

export const getServicio = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Servicio.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'servicio no encontrado'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Servicio encontrado satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getServicioActivoByUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const itin = await Itinerario.find({$or:[{ choferid: id }, { colectorid: id }]})

    if (itin.length === 0) {
        return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'No Itinerario found'
        });
    }

    const arregloItinerarios = itin.map((it) => { return it._id })

    const Servs = await Servicio.find({ itinerarioid: { $in: arregloItinerarios }, finalizado: false }).populate({
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
    })

    try {
        if (Servs.length === 0) {
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'No Servicio found'
            });
        }

        return res.status(httpCode[200].code).json({
            data_send: Servs,
            num_status: httpCode[200].code,
            msg_status: 'Data found successfully'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getServicioActivoByCodigoUnidad = async (req: Request, res: Response): Promise<Response> => {
    const { codigo } = req.params;
    if (codigo === null || codigo === undefined || !codigo ) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El codigo no es válido'
        });
    }
    const vehi = await Vehiculo.findOne({codigo_unidad:codigo})

    if (!vehi) {
        return res.status(httpCode[200].code).json({
            data_send: [],
            num_status: httpCode[200].code,
            msg_status: 'Vehículo no enconttrado'
        });
    }

    const itin = await Itinerario.find({ vehiculoid:vehi._id })

    if (itin.length === 0) {
        return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'No Itinerario found'
        });
    }

    const arregloItinerarios = itin.map((it) => { return it._id })

    const Servs = await Servicio.find({ itinerarioid: { $in: arregloItinerarios }, finalizado: false }).populate({
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
    })

    try {
        if (Servs.length === 0) {
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'No Servicio found'
            });
        }

        return res.status(httpCode[200].code).json({
            data_send: Servs,
            num_status: httpCode[200].code,
            msg_status: 'Data found successfully'
        });
    } catch (error) {
        console.log(error);
        
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const create = async (req: Request, res: Response): Promise<Response> => {

    const { itinerarioid, latitud, longitud } = req.body

    

    if (!itinerarioid || itinerarioid === null || itinerarioid == "" || itinerarioid == undefined) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El itinerario es obligatorio, verifique.'
        });
    }

    if (!latitud || latitud === null || latitud == "" || latitud == undefined) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El campo latitud es obligatorio, es un campo numerico, formato (-127.554334) verifique.'
        });
    }

    if (!longitud || longitud === null || longitud == "" || longitud == undefined) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El campo longitud es obligatorio, es un campo numerico, formato (-127.554334) verifique.'
        });
    } 

    const data = await Servicio.findOne({ itinerarioid: itinerarioid, finalizado:false })
    if (data) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'La Servicio ya existe debe finalizar el servicio antes de iniciar otro.'
        })
    }

    const newServicio = new Servicio({
        itinerarioid,
        latitud,
        longitud
    });

    try {

        await newServicio.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newServicio,
                num_status: httpCode[201].code,
                msg_status: 'Servicip creado satisfactoriamente.'
            });

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later ' + error
        })
    }
}


export const activarServicio = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'Id is invalid'
            });
        }
        const dat = await Servicio.findById(id);
        if (!dat) {
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'Parada no encontrada.'
            });
        }

        dat.activo = true;

        await dat.save();

        return res.status(httpCode[200].code).json({
            data_send: dat,
            num_status: httpCode[200].code,
            msg_status: 'Servicio activada con éxito.'
        });

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem trying to modify the route, try again later (ruta)'
        });
    }
}

export const finalizarServicio = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'Id is invalid'
            });
        }
        const dat = await Servicio.findById(id);
        if (!dat) {
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'Parada no encontrada.'
            });
        }

        dat.finalizado = true;

        await dat.save();

        return res.status(httpCode[200].code).json({
            data_send: dat,
            num_status: httpCode[200].code,
            msg_status: 'Servicio finalizado con éxito.'
        });

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem trying to modify the route, try again later (ruta)'
        });
    }
}


export const actualizaUbicacion = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { latitud, longitud } = req.body;

        if (!latitud || latitud === null || latitud == "" || latitud == undefined) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El campo latitud es obligatorio, es un campo numerico, formato (-127.554334) verifique.'
            });
        } 

        if (!longitud || longitud === null || longitud == "" || longitud == undefined) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El campo longitud es obligatorio, es un campo numerico, formato (-127.554334) verifique.'
            });
        } 
        
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'Id is invalid'
            });
        }
        const dat:any = await Servicio.findById(id).populate('itinerarioid');

        if (!dat) {
            return res.status(httpCode[404].code).json({
                data_send: "",
                num_status: httpCode[404].code,
                msg_status: 'servicio no encontrado.'
            });
        }

        // dat.activo = true;
        dat.latitud = latitud
        dat.longitud = longitud
        await dat.save();

        utilsHandle.llamarSocket({ servicioid: id, latitud, longitud, rutaid: dat.itinerarioid.rutaid, action:'locationUpdated'}, 'unirseAruta')

        return res.status(httpCode[200].code).json({
            data_send: dat,
            num_status: httpCode[200].code,
            msg_status: 'Servicio activada con éxito.'
        });

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem trying to modify the route, try again later (ruta)'
        });
    }
}


