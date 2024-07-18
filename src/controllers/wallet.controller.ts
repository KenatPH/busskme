import express, { Request, Response } from "express";
import Wallet from "../models/wallet.model";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";
import utilsHandle from "../utils/utilsHandle";

export const getWallet = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Wallet.findById(id)
        .populate('userid', 'nombre')

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
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

export const getWalletByUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Wallet.findOne({userid:id})
        .populate('userid', 'nombre')

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
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