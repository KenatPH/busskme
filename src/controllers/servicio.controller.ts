
import express, { Request, Response } from "express";
import Servicio from "../models/servicio.models";
import mongoose from "mongoose";
import { paradaSchema } from "../schemas/parada.schema";
import { httpCode } from "../utils/httpStatusHandle";
import { ObjectId } from 'mongodb';


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

export const create = async (req: Request, res: Response): Promise<Response> => {

    const { itinerarioid } = req?.body

    if (!itinerarioid || itinerarioid === null || itinerarioid == "" || itinerarioid == undefined) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El campo itinerarioid es obligatorio, verifique.'
        });
    }

    const newServicio = new Servicio({
        itinerarioid
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

// export const deleteParada = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { id } = req.params;

//         if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
//             return res.status(httpCode[409].code).json({
//                 data_send: "",
//                 num_status: httpCode[409].code,
//                 msg_status: 'Id is invalid'
//             });
//         }
//         const dat = await Parada.findById(id);
//         if (!dat) {
//             return res.status(httpCode[200].code).json({
//                 data_send: [],
//                 num_status: httpCode[200].code,
//                 msg_status: 'Parada no encontrada.'
//             });
//         }

//         dat.activo = false;

//         await dat.save();

//         return res.status(httpCode[200].code).json({
//             data_send: {
//                 "nombre": dat.nombre.toUpperCase(),
//                 "activo": dat.activo,
//                 "aprobado": dat.aprobado
//             },
//             num_status: httpCode[200].code,
//             msg_status: 'Parada eliminada con éxito.'
//         });

//     } catch (error) {
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'There was a problem trying to modify the route, try again later (ruta)'
//         });
//     }
// }

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