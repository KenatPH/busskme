
import express, { Request, Response } from "express";
import Notificaciones from "../models/notificacion.model";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";


export const getListNotificacion = async (req: Request, res: Response): Promise<Response> => {
    const { page, id } = req.params;
    let where = {}

    if (!id) {
        return res.status(409).json({
            data_send: "",
            num_status: 1,
            msg_status: 'Los campos "id" son obligatorios'
        })
    }
    const offset = (parseInt((page)? page:'1') - 1) * 10
    try {
        const data = await Notificaciones
                .find({
                    userId: id 
                }).sort([['createdAt', 'desc']]).skip(offset).limit(10);


        const notificiacionesNoLeidas = await Notificaciones.countDocuments({ userId: id, leida: false })

        return res.status(200).json({
            data_send: { data, notificiacionesNoLeidas },
            num_status: 1,
            msg_status: 'Notificaciones completadas'
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: error
        });
    }

}

export const getnotificacion = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const notificacion = await Notificaciones.find({_id: id })

    if (!notificacion) {
        return res.status(404).json({
            data_send: "",
            num_status: 404,
            msg_status: 'Notificación no encontrada.'
        });
    }

    try {
        return res.status(201).json(
            {
                data_send: notificacion,
                num_status: 0,
                msg_status: 'Notificación encontrada.'
            }
        );
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

export const crearNotificacion = async (titulo: string, cuerpo: string, link: string, userId: string) => {

    const notificacion = new Notificaciones({
        userId,
        cuerpo,
        titulo,
        link,
        fecha: Date.now(),
        leida: false,
    });

    try {

        await notificacion.save();
        const respJson = {
            msg: "Notificacion creada correctamente.",
            success: true
        }
        return respJson;
    } catch (error) {
        const respJson = {
            msg: "There was a problem with the server when saving the user error(500)",
            success: false
        }
        return respJson;
    }
}