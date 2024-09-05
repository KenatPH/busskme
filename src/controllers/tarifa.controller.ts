
import express, { Request, Response } from "express";
import Tarifa from "../models/tarifa.models";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";
import utilsHandle from "../utils/utilsHandle";

export const getTarifa = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Tarifa.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tarifa no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Tarifa encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataTarifas = async (req: Request, res: Response): Promise<Response> => {
    const data = await Tarifa.find();

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tarifa no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Tarifa encontrada satisfactoriamente.'
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

    const { nombre, cantidadMinimaParadas, cantidadMaximaParadas , monto } = req?.body

    if (!nombre || nombre == null || nombre == "") {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'El nombre de la Tarifa, es obligatorio.'
        })
    }

    if (!utilsHandle.validateFieldNum(cantidadMinimaParadas)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', El parametro cantidadMinimaParadas es requerido, es sólo numeros.'
        });
    }  

    if (!utilsHandle.validateFieldNum(cantidadMaximaParadas)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', El parametro cantidadMaximaParadas es requerido, es sólo numeros.'
        });
    }

    if (!utilsHandle.validateFieldNum(monto)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', El parametro cantidadMaximaParadas es requerido, es sólo numeros.'
        });
    }  

    const data = await Tarifa.findOne({ nombre: nombre })
    if (data) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'La Tarifa ya existse.'
        })
    }

    const newTarifa = new Tarifa({
        nombre,
        cantidadMinimaParadas,
        cantidadMaximaParadas,
        monto
    });

    try {

        await newTarifa.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newTarifa,
                num_status: httpCode[201].code,
                msg_status: 'Tarifa creada satisfactoriamente.'
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
        const { nombre, cantidadMinimaParadas, cantidadMaximaParadas, monto } = req?.body

        if (!nombre || nombre == null || nombre == "") {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'El nombre de la Tarifa, es obligatorio.'
            })
        }

        if (!utilsHandle.validateFieldNum(cantidadMinimaParadas)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: httpCode[409].message + ', El parametro cantidadMinimaParadas es requerido, es sólo numeros.'
            });
        }

        if (!utilsHandle.validateFieldNum(cantidadMaximaParadas)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: httpCode[409].message + ', El parametro cantidadMaximaParadas es requerido, es sólo numeros.'
            });
        }

        if (!utilsHandle.validateFieldNum(monto)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: httpCode[409].message + ', El parametro cantidadMaximaParadas es requerido, es sólo numeros.'
            });
        }  

        const data = await Tarifa.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tarifa no encontrada.'
            });
        }

        if (!nombre || nombre == null || nombre == "") {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El nombre, es obligatorio'
            })
        }

        data.nombre = nombre
        data.cantidadMaximaParadas = cantidadMaximaParadas
        data.cantidadMinimaParadas = cantidadMinimaParadas
        data.monto = monto
        await data.save();

        return res.status(httpCode[200].code).json({
            data_send: {
                "Tarifa": data.nombre,
                "activo": data.activo,
            },
            num_status: httpCode[200].code,
            msg_status: 'Tarifa modificada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const deleteTarifa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Tarifa.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tarifa no encontrada.'
            });
        } else {
            if (data.activo === true) {
                data.activo = false;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "Tarifa": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Tarifa borrada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "Tarifa": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Tarifa ya se encuentra con estatus eliminada.'
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

export const activarTarifa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Tarifa.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tarifa no encontrada.'
            });
        } else {
            if (data.activo === false) {
                data.activo = true;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "Tarifa": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Tarifa activada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "Tarifa": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Tarifa ya se encuentra con estatus activa.'
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
