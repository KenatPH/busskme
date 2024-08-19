
import express, { Request, Response } from "express";
import TipoPreferencial from "../models/tipoPreferencial.models";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";

export const getTipoPreferencial = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await TipoPreferencial.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tipo Preferencial no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Tipo Preferencial encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataTipoPreferencial = async (req: Request, res: Response): Promise<Response> => {
    const data = await TipoPreferencial.find();

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'TipoPreferencial no enconttrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'TipoPreferencial encontrada satisfactoriamente.'
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

    const { nombre, monto } = req?.body

    if (!nombre || nombre == null || nombre == "") {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'El nombre es obligatorio.'
        })
    }

    if (!monto || monto == null || monto == "" || monto == "0") {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: 'El monto es obligatorio.'
        })
    }


    const data = await TipoPreferencial.findOne({ nombre: nombre })
    if (data) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Tipo Preferencial ya existse.'
        })
    }

    const newTipoPreferencial = new TipoPreferencial({
        nombre: nombre,
        monto
    });

    try {

        await newTipoPreferencial.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newTipoPreferencial,
                num_status: httpCode[201].code,
                msg_status: 'Creado satisfactoriamente.'
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

        const { nombre, monto } = req.body;

        if (!nombre || nombre == null || nombre == "") {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'El nombre es obligatorio.'
            })
        }
        if (!monto || monto == null || monto == "" || monto == "0") {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'El monto es obligatorio.'
            })
        }

        const data = await TipoPreferencial.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'TipoPreferencial no encontrada.'
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
        data.monto=monto
        await data.save();

        return res.status(httpCode[200].code).json({
            data_send: {
                "TipoPreferencial": data.nombre,
                "activo": data.activo,
            },
            num_status: httpCode[200].code,
            msg_status: 'TipoPreferencial modificada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const deleteTipoPreferencial = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await TipoPreferencial.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'TipoPreferencial no encontrada.'
            });
        } else {
            if (data.activo === true) {
                data.activo = false;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "TipoPreferencial": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'TipoPreferencial borrada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "TipoPreferencial": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'TipoPreferencial ya se encuentra con estatus eliminada.'
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

export const activarTipoPreferencial = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await TipoPreferencial.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'TipoPreferencial no encontrada.'
            });
        } else {
            if (data.activo === false) {
                data.activo = true;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "TipoPreferencial": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'TipoPreferencial activada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: {
                        "TipoPreferencial": data.nombre,
                        "activo": data.activo
                    },
                    num_status: httpCode[200].code,
                    msg_status: 'TipoPreferencial ya se encuentra con estatus activa.'
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
