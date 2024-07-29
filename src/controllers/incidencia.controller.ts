
import express, { Request, Response } from "express";
import Incidencia from "../models/incidencia.model";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";
import utilsHandle from "../utils/utilsHandle";
import path from 'path';
import fs from 'fs-extra';

export const getIncidencia = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Incidencia.findById(id).populate({
        path: 'vehiculoid',
        select: 'marcaid modeloid marcaid userid',
        populate: {
            path: 'colorid modeloid marcaid userid',
            select: 'color nombre'
        },
    })
        .populate({
            path: 'choferid colectorid',
            select: 'userid',
            populate: {
                path: 'userid',
                select: 'nombre'
            },
        })
        .populate('rutaid baseid');

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Incidencia no encontrado'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Incidencia encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataIncidencia = async (req: Request, res: Response): Promise<Response> => {
    const data = await Incidencia.find().populate({
        path: 'vehiculoid',
        select: 'marcaid modeloid marcaid userid',
        populate: {
            path: 'colorid modeloid marcaid userid',
            select: 'color nombre'
        },
    })
        // .populate({
        //     path: 'choferid',
        //     select: 'userid',
        //     populate: {
        //         path: 'userid',
        //         select: 'nombre'
        //     },
        // })
        .populate('rutaid baseid choferid','nombre');

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: "",
                num_status: httpCode[204].code,
                msg_status: 'incidencia no enconttrada'
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
        descripcion,
        fecha } = req?.body

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

    // if (colectorid === null || colectorid === undefined || !colectorid || !ObjectId.isValid(colectorid)) {
    //     return res.status(httpCode[409].code).json({
    //         data_send: "",
    //         num_status: httpCode[409].code,
    //         msg_status: 'colectorid no es válido'
    //     });
    // }

    // if (baseid === null || baseid === undefined || !baseid || !ObjectId.isValid(baseid)) {
    //     return res.status(httpCode[409].code).json({
    //         data_send: "",
    //         num_status: httpCode[409].code,
    //         msg_status: 'baseid no es válido'
    //     });
    // }

    if (!utilsHandle.validateFecha(fecha)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', La fecha es requerida, formato (YYYY-MM-DD).'
        });
    }

    
    var img = Object(); let imagen_incidencia = "";
    img = req.file;
    if (img != undefined && img !== null && img) {
        imagen_incidencia = img.path ? img.path : "";
    } else {
        imagen_incidencia = "";
    }  


    const newInt = new Incidencia({
        vehiculoid,
        rutaid,
        choferid,
        colectorid,
        baseid,
        descripcion,
        fecha,
        imagen: imagen_incidencia,
        activo: true,
    });

    try {

        await newInt.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newInt,
                num_status: httpCode[201].code,
                msg_status: 'Incidencia creado satisfactoriamente.'
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
            descripcion,
            fecha } = req?.body

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

        const data = await Incidencia.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Base no encontrada.'
            });
        }

        var img = Object();
        let imagen_incidencia = "";
        img = req.file;
        if (img != undefined && img !== null && img) {
            imagen_incidencia = img.path ? img.path : "";
        } else {
            imagen_incidencia = "";
        }

        if (imagen_incidencia !== "" && imagen_incidencia !== undefined && imagen_incidencia !== null) {
            const storagePath = path.resolve(data.imagen);
            deleteImage(storagePath)
        } else {
            imagen_incidencia = data.imagen;
        }



        data.vehiculoid = vehiculoid;
        data.rutaid = rutaid;
        data.choferid = choferid;
        data.colectorid = colectorid;
        data.descripcion = descripcion;
        data.baseid = baseid;
        data.fecha = fecha;
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

export const deleteIncidencia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Incidencia.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Incidencia no encontrado.'
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
                    msg_status: 'Incidencia ya se encuentra con estatus eliminada.'
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

        const data = await Incidencia.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Base no encontrada.'
            });
        } else {
            if (data.activo === false) {
                data.activo = true;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'Incidencia activado satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'Incidencia ya se encuentra con estatus activo.'
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


function deleteImage(storagePath: string) {
    try {

        if (fs.existsSync(storagePath)) {
            fs.unlink(storagePath);
        }

    } catch (error) {
        // Ignore errors
        console.log((error))
    }
}