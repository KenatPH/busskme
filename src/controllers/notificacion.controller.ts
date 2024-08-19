
import express, { Request, Response } from "express";
import Notificaciones from "../models/notificacion.model";
import Vehiculo from "../models/vehiculos/vehiculo.models";
import Operador from "../models/operador.models";
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
                    userid: id 
                }).sort([['createdAt', 'desc']])/* .skip(offset).limit(10); */


        const notificiacionesNoLeidas = await Notificaciones.countDocuments({ userid: id, leida: false })

        return res.status(200).json({
            data_send: { data, notificiacionesNoLeidas },
            num_status: 200,
            msg_status: 'Notificaciones completadas'
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: error
        });
    }

}

export const getListNotificacionAdmin = async (req: Request, res: Response): Promise<Response> => {
    const { page } = req.params;
    let where = {}


    const offset = (parseInt((page) ? page : '1') - 1) * 10
    try {
        const data = await Notificaciones
            .find({
                admin: true, leida:false
            }).sort([['createdAt', 'desc']]).skip(offset).limit(10);


        const notificiacionesNoLeidas = await Notificaciones.countDocuments({ admin: true, leida: false })

        return res.status(200).json({
            data_send: { data, notificiacionesNoLeidas },
            num_status: 200,
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
                num_status: 200,
                msg_status: 'Notificación encontrada.'
            }
        );
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

export const crearNotificacion = async (titulo: string, cuerpo: string, link: string, userid: any, admin:boolean = false) => {

    const notificacion = new Notificaciones({
        userid,
        cuerpo,
        titulo,
        link,
        fecha: Date.now(),
        leida: false,
        admin
    });

    try {

        await notificacion.save();
        const respJson = {
            msg: "Notificacion creada correctamente.",
            success: true
        }
        return respJson;
    } catch (error) {
        console.log(error)
        const respJson = {
            msg: "There was a problem with the server when saving the user error(500)",
            success: false
        }
        return respJson;
    }
}

export const updateLeida = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    if (!id) {

        return res.status(409).json({
            data_send: "",
            num_status: 1,
            msg_status: 'El campo id es inválido, revise la información enviada.'
        })
    }

    const notificacion = await Notificaciones.findById(id)

    if (!notificacion) {
        return res.status(404).json({
            data_send: "",
            num_status: 404,
            msg_status: 'Notificación no encontrada.'
        });
    }

    try {
        notificacion.leida = true;
        await notificacion.save();
        return res.status(200).json(
            {
                data_send: notificacion,
                num_status: 0,
                msg_status: 'Notificación marcada como leida correctamente.'
            });
    } catch (error) {
        return res.status(500).json({
            data_send: "",
            num_status: 500,
            msg_status: 'problemas en el server, al marcar la notificación como no leída.'
        })
    }
}

export const validaFechasVencimiento = async() => {

    const hoy = new Date();
    const fechaLimite = new Date(hoy);
    fechaLimite.setDate(hoy.getDate() + 30);

    const vehiculos_poliza_por_vencer = await Vehiculo.find({
        fecha_venc_poliza: { $lt: fechaLimite }
    });


    const veh_not = vehiculos_poliza_por_vencer.map((v: any) => {
        return {
            // userid: v.userid, 
            cuerpo: `la poliza de seguro de un vehiculo esta por vencer`,
            titulo: `Documento proximo a vencer`,
            link: `/transportes/?id=${v._id}`,
            fecha: Date.now(),
            leida: false,
            admin:true
        } })

    await Notificaciones.insertMany(veh_not);

    const operador_licencia_por_vencer = await Operador.find({
        fecha_venc_lic: { $lt: fechaLimite }
    });
    createAlerts(operador_licencia_por_vencer, `la licencia de operador esta por vencer`, `Documento proximo a vencer`, '/operadores', true)

    const operador_certificado_med_por_vencer = await Operador.find({
        fecha_venc_cermed: { $lt: fechaLimite }
    });

    createAlerts(operador_certificado_med_por_vencer, `El certificado de medico operador esta por vencer`, `Documento proximo a vencer`, '/operadores', true)


    const operador_rif_por_vencer = await Operador.find({
        fecha_venc_rif: { $lt: fechaLimite }
    });

    createAlerts(operador_rif_por_vencer, `El rif de operador esta por vencer`, `Documento proximo a vencer`, '/operadores', true)

    const operador_dni_por_vencer = await Operador.find({
        fecha_venc_dni: { $lt: fechaLimite }
    });

    createAlerts(operador_dni_por_vencer, `El dni de operador esta por vencer`, `Documento proximo a vencer`, '/operadores', true)
    

}

const createAlerts = async (arrObj: any[], cuerpo: string, titulo: string, link: string, admin: boolean) => {

    const not = arrObj.map((o: any) => {
        return {
            // userid: v.userid, 
            cuerpo,
            titulo,
            link: link + `?id=${o.userid}`,
            fecha: Date.now(),
            leida: false,
            admin
        }
    })

    await Notificaciones.insertMany(not);
}