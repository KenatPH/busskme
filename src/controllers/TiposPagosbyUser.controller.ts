
import express, { Request, Response } from "express";
import Tp from "../models/tiposPagosbyUser.models";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";

export const getTipoPago = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Tp.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'No encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataTp = async (req: Request, res: Response): Promise<Response> => {
    const data = await Tp.find();

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'No Encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Encontrada satisfactoriamente.'
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

    const { type, details } = req?.body

    const userid = req.user


    if (!type || type == null || type == "") {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'type, es obligatorio.'
        })
    }

    if (!details || details == null || details == "") {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'type, es obligatorio.'
        })
    }


    const newBase = new Tp({
        userid,
        type,
        details
    });

    try {

        await newBase.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newBase,
                num_status: httpCode[201].code,
                msg_status: 'tipo de pago creado satisfactoriamente.'
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

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { id } = req.params;
        const { userid, type, details } = req?.body

        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }


        if (!userid || userid == null || userid == "") {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'userid, es obligatorio.'
            })
        }
        if (!type || type == null || type == "") {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'type, es obligatorio.'
            })
        }

        const data = await Tp.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Base no encontrada.'
            });
        }


        data.type = type
        data.details = details
        await data.save();

        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'tipo de pago modificado satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const deleteTipopago = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Tp.findByIdAndDelete(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'tipo de pago no encontrado.'
            });
        } else {

                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'Tipo de pago ya se encuentra con estatus eliminada.'
                });
            

        }

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}


