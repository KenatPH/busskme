
import express, { Request, Response } from "express";
import TarifaAdicional from "../models/tarifaAdicional.model"
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";

export const getTarifaAdicional = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await TarifaAdicional.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'TarifaAdicional no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'TarifaAdicional encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataTarifaAdicional = async (req: Request, res: Response): Promise<Response> => {
    const data = await TarifaAdicional.find();

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tarifa Adicional no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'TarifaAdicional encontrada satisfactoriamente.'
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

    const { tipo, monto, fecha } = req?.body

    // if (!tipo || tipo == null || tipo == "") {
    //     return res.status(httpCode[409].code).json({
    //         data_send: "",
    //         num_status: httpCode[204].code,
    //         msg_status: 'El tipo de la Tarifa Adicional, es obligatorio.'
    //     })
    // }
    if (!monto || monto == null || monto == "") {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'El monto de la Tarifa Adicional, es obligatorio.'
        })
    }



    const newTarifaAdicional = new TarifaAdicional({
        tipo: 'finDeSemana', monto, fecha
    });

    try {

        await newTarifaAdicional.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newTarifaAdicional,
                num_status: httpCode[201].code,
                msg_status: 'TarifaAdicional creada satisfactoriamente.'
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

        const { tipo, monto, fecha } = req?.body

        // if (!tipo || tipo == null || tipo == "") {
        //     return res.status(httpCode[409].code).json({
        //         data_send: "",
        //         num_status: httpCode[204].code,
        //         msg_status: 'El tipo de la Tarifa Adicional, es obligatorio.'
        //     })
        // }
        if (!monto || monto == null || monto == "") {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'El monto de la Tarifa Adicional, es obligatorio.'
            })
        }


        const data = await TarifaAdicional.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tarifa Adicional no encontrada.'
            });
        }


        data.monto = monto
        data.tipo = 'finDeSemana'
        data.fecha = fecha

        await data.save();

        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'TarifaAdicional modificada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const deleteTarifaAdicional = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await TarifaAdicional.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'TarifaAdicional no encontrada.'
            });
        } else {
            if (data.activo === true) {
                data.activo = false;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'TarifaAdicional borrada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'TarifaAdicional ya se encuentra con estatus eliminada.'
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

export const activarTarifaAdicional = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await TarifaAdicional.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'TarifaAdicional no encontrada.'
            });
        } else {
            if (data.activo === false) {
                data.activo = true;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'TarifaAdicional activada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'TarifaAdicional ya se encuentra con estatus activa.'
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
