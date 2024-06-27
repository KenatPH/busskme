
import express, { Request, Response } from "express";
import Bases from "../models/base.models";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";

export const getBase = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Bases.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[204].code).json({
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

export const getDataBases = async (req: Request, res: Response): Promise<Response> => {
    const data = await Bases.find();

    try {
        if (data.length === 0) {
            return res.status(httpCode[204].code).json({
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

    const { nombre } = req?.body

    if (!nombre || nombre == null || nombre == "") {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'El nombre de la Base, es obligatorio.'
        })
    }

    const data = await Bases.findOne({ nombre: nombre.toUpperCase() })
    if (data) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'La Base ya existse.'
        })
    }

    const newBase = new Bases({
        nombre: nombre.toUpperCase(),
    });

    try {

        await newBase.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newBase,
                num_status: httpCode[201].code,
                msg_status: 'Base creada satisfactoriamente.'
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
        const { nombre } = req.body;

        const data = await Bases.findById(id);

        if (!data) {
            return res.status(httpCode[204].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'Base no encontrada.'
            });
        }

        if (!nombre || nombre == null || nombre == "") {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El nombre, es obligatorio (marca)'
            })
        }

        data.nombre = nombre.toUpperCase();
        await data.save();

        return res.status(httpCode[200].code).json({
            data_send: {
                "Base": data.nombre.toUpperCase(),
                "activo": data.activo,
            },
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

export const deleteBase = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Bases.findById(id);

        if (!data) {
            return res.status(httpCode[204].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'Marca no encontrada.'
            });
        } else {
            if (data.activo === true) {
                data.activo = false;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "Base": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Base borrada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "Base": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Base ya se encuentra con estatus eliminada.'
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

export const activarBase = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Bases.findById(id);

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
                    data_send: {
                        "Base": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Base activada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "Bases": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'Base ya se encuentra con estatus activa.'
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
