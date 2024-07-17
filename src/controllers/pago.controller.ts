import express, { Request, Response } from "express";
import Pago from "../models/pago.models";
import path from 'path';
import config from '../config/config';
import mongoose from "mongoose";
import User from "../models/users.models";
import { httpCode } from "../utils/httpStatusHandle";
import { ObjectId } from 'mongodb';
import fs from 'fs-extra';
import { crearNotificacion } from "./notificacion.controller";


export const registarPago = async (req: Request, res: Response): Promise<Response> => {
    const { userid, titulo, referencia, tipoid, servicioid } = req?.body
    // const { titulo, referencia, nombre, telefono, cedula, userId, torneoId } = req.body;

    if (!referencia || referencia == null || referencia == undefined || referencia == "") {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: httpCode[409].message + ', La referencia  es requerida.'
        });
    }

    if (userid === null || userid === undefined || !userid || !ObjectId.isValid(userid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'userid no es válido'
        });
    }

    if (tipoid === null || tipoid === undefined || !tipoid || !ObjectId.isValid(tipoid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'tipoid no es válido'
        });
    }

    // if (servicioid === null || servicioid === undefined || !servicioid || !ObjectId.isValid(servicioid)) {
    //     return res.status(httpCode[409].code).json({
    //         data_send: "",
    //         num_status: httpCode[409].code,
    //         msg_status: 'servicioid no es válido'
    //     });
    // }

    try {


        const pago = new Pago({
            titulo,
            referencia,
            // servicioid,
            tipoid,
            userid,
            aprobado:false
        });

        const titulo1 = "Usted a recibido un pago.";
        const cuerpo = `Recibido un pago`;
        const link = "";
        const notificacion = await crearNotificacion(titulo1, cuerpo, link, userid);
        if (!notificacion || notificacion.success === false) {
            return res.status(409).json({
                data_send: "",
                num_status: httpCode[201].code,
                msg_status: notificacion.msg
            });
        }


        await pago.save();
        return res.status(201).json(
            {
                data_send: pago,
                num_status: 0,
                msg_status: 'Pago creado correctamente.'
            });

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}


export const getListPagos = async (req: Request, res: Response): Promise<Response> => {

    const { pag, id } = req.params;
    const offset = (parseInt(pag) - 1) * 10

    let where: any = {}
    if (id) {
        where = { clubId: id }
    }

    const data = await Pago.find().sort([['createdAt', 'desc']]).skip(offset).limit(10);

    try {

        return res.status(201).json(data);
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
}



export const getPago = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const data = await Pago.findById(id)
    if (!data) {
        return res.status(httpCode[204].code).json({
            data_send: "",
            num_status: httpCode[204].code,
            msg_status: httpCode[204].message
        });
    }

    try {
        return res.status(200).json(
            {
                data_send: data,
                num_status: httpCode[200].code,
                msg_status: httpCode[200].message
            }
        );
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
}

export const validarPago = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        if (!id) {

            return res.status(200).json({
                data_send: "",
                num_status: 1,
                msg_status: 'Los campos  id son obligatorios'
            })

        }
        const data = await Pago.findById(id)

        if (!data) {
            return res.status(200).json({
                data_send: "",
                num_status: 6,
                msg_status: 'pago no Encontrado'
            });
        }



        data.confirmado = true
        await data.save()

        const user = await User.findById(data.userid)

        const titulo = "Pago Confirmado";
        const cuerpo = `Su pago fue confirmado con exito`;
        // const link = `/resumenTorneo/${torneo.id}`;

        // console.log(data.user.id);
        
        await crearNotificacion(titulo, cuerpo, "", user?._id);

        return res.status(200).json(
            {
                data_send: data,
                num_status: 0,
                msg_status: 'success'
            }
        );
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
}


