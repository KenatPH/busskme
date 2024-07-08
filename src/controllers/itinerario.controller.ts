
import express, { Request, Response } from "express";
import Itinerario from "../models/itinerario.model";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";
import utilsHandle from "../utils/utilsHandle";

export const getItinerario = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Itinerario.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[204].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'Itinerario no encontrado'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Itinerario encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataItinerario = async (req: Request, res: Response): Promise<Response> => {
    const data = await Itinerario.find();

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'Base no enconttrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Base encontrada satisfactoriamente.'
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

    const { vehiculoid,
        rutaid,
        choferid,
        colectorid,
        baseid,
        fecha,
        hora_salida } = req?.body

    if (vehiculoid === null || vehiculoid === undefined || !vehiculoid || !ObjectId.isValid(vehiculoid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'vehiculoid no es válido'
        });
    }

    if (rutaid === null || rutaid === undefined || !rutaid || !ObjectId.isValid(rutaid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'rutaid no es válido'
        });
    }

    if (choferid === null || choferid === undefined || !choferid || !ObjectId.isValid(choferid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'choferid no es válido'
        });
    }

    if (colectorid === null || colectorid === undefined || !colectorid || !ObjectId.isValid(colectorid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'colectorid no es válido'
        });
    }

    if (baseid === null || baseid === undefined || !baseid || !ObjectId.isValid(baseid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'baseid no es válido'
        });
    }

    if (!utilsHandle.validateFecha(fecha)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', La fecha es requerida, formato (YYYY-MM-DD).'
        });
    }

    if (!utilsHandle.validateTime24HourFormat(hora_salida)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', La hora de salida es requerida, formato (HH:MM).'
        });
    }


    const newInt = new Itinerario({
        vehiculoid,
        rutaid,
        choferid,
        colectorid,
        baseid,
        fecha,
        hora_salida,
        activo:true,
    });

    try {

        await newInt.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newInt,
                num_status: httpCode[201].code,
                msg_status: 'itinerario creado satisfactoriamente.'
            });

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}


export const update = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }
        const { vehiculoid,
            rutaid,
            choferid,
            colectorid,
            baseid,
            fecha,
            hora_salida } = req?.body

        if (vehiculoid === null || vehiculoid === undefined || !vehiculoid || !ObjectId.isValid(vehiculoid)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'vehiculoid no es válido'
            });
        }

        if (rutaid === null || rutaid === undefined || !rutaid || !ObjectId.isValid(rutaid)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'rutaid no es válido'
            });
        }

        if (choferid === null || choferid === undefined || !choferid || !ObjectId.isValid(choferid)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'choferid no es válido'
            });
        }

        if (colectorid === null || colectorid === undefined || !colectorid || !ObjectId.isValid(colectorid)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'colectorid no es válido'
            });
        }

        if (baseid === null || baseid === undefined || !baseid || !ObjectId.isValid(baseid)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'baseid no es válido'
            });
        }

        if (!utilsHandle.validateFecha(fecha)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: httpCode[409].message + ', La fecha es requerida, formato (YYYY-MM-DD).'
            });
        }

        if (!utilsHandle.validateTime24HourFormat(hora_salida)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: httpCode[409].message + ', La hora de salida es requerida, formato (HH:MM).'
            });
        }

        const data = await Itinerario.findById(id);

        if (!data) {
            return res.status(httpCode[204].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'Base no encontrada.'
            });
        }


        
        data.vehiculoid = vehiculoid;
        data.rutaid = rutaid;
        data.choferid = choferid;
        data.colectorid = colectorid;
        data.baseid = baseid;
        data.fecha = fecha;
        data.hora_salida = hora_salida;
        await data.save();

        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'BAse modificada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const deleteItinerario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Itinerario.findById(id);

        if (!data) {
            return res.status(httpCode[204].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'Itinerario no encontrado.'
            });
        } else {
            if (data.activo === true) {
                data.activo = false;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'Base borrada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'Itinerario ya se encuentra con estatus eliminada.'
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

export const activar = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Itinerario.findById(id);

        if (!data) {
            return res.status(httpCode[204].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'Base no encontrada.'
            });
        } else {
            if (data.activo === false) {
                data.activo = true;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'Itinerario activado satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'Itinerario ya se encuentra con estatus activo.'
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
