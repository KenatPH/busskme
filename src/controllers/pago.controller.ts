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


// export const getMetodoPagoById = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
//         return res.status(httpCode[409].code).json({
//             data_send: "",
//             num_status: httpCode[409].code,
//             msg_status: 'Id is invalid'
//         });
//     }
//     const dat = await Metodopago.findById(id);

//     try {
//         if (!dat) {
//             return res.status(httpCode[204].code).json({
//                 data_send: "",
//                 num_status: httpCode[204].code,
//                 msg_status: httpCode[204].message
//             });
//         }
//         return res.status(httpCode[200].code).json({
//             data_send: dat,
//             num_status: httpCode[200].code,
//             msg_status: httpCode[200].message
//         });
//     } catch (error) {
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'There was a problem with the server, try again later '
//         })
//     }

// }

// export const getDataMetodoPagos = async (req: Request, res: Response): Promise<Response> => {
//     const dat = await Metodopago.find()
//         .populate('paisid', 'nombre');
//     try {
//         if (dat.length === 0) {
//             return res.status(httpCode[204].code).json({
//                 data_send: "",
//                 num_status: httpCode[204].code,
//                 msg_status: httpCode[204].message
//             });
//         }
//         return res.status(httpCode[200].code).json({
//             data_send: dat,
//             num_status: httpCode[200].code,
//             msg_status: 'Métodos de pago encontrados.'
//         });
//     } catch (error) {
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'There was a problem with the server, try again later (club)'
//         })
//     }
// }

// export const getMetodoPagoByPais = async (req: Request, res: Response): Promise<Response> => {
//     const dat = await Metodopago.find()
//         .populate('paisid', 'nombre');
//     try {
//         if (dat.length === 0) {
//             return res.status(httpCode[204].code).json({
//                 data_send: "",
//                 num_status: httpCode[204].code,
//                 msg_status: httpCode[204].message
//             });
//         }
//         return res.status(httpCode[200].code).json({
//             data_send: dat,
//             num_status: httpCode[200].code,
//             msg_status: 'Métodos de pago encontrados.'
//         });
//     } catch (error) {
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'There was a problem with the server, try again later (club)'
//         })
//     }
// }

// export const create = async (req: Request, res: Response): Promise<Response> => {
//     const { paisid, titulo, referencia } = req?.body

//     if (paisid === null || paisid === undefined || !paisid || !ObjectId.isValid(paisid)) {
//         return res.status(httpCode[409].code).json({
//             data_send: "",
//             num_status: httpCode[409].code,
//             msg_status: 'Paisid is invalid'
//         });
//     }
//     if (!titulo || titulo == null || titulo == undefined || titulo == "") {
//         return res.status(httpCode[409].code).json({
//             data_send: "",
//             num_status: httpCode[409].code,
//             msg_status: httpCode[409].message + ', El título es requerido.'
//         });
//     }
//     if (!referencia || referencia == null || referencia == undefined || referencia == "") {
//         return res.status(httpCode[409].code).json({
//             data_send: "",
//             num_status: httpCode[409].code,
//             msg_status: httpCode[409].message + ', La referencia  es requerida.'
//         });
//     }
//     var img = Object();
//     if (!img || img === undefined || img === null) {
//         return res.status(httpCode[409].code).json({
//             data_send: "",
//             num_status: httpCode[409].code,
//             msg_status: 'La imagen no es válida.'
//         });
//     }
//     img = req.file;

//     const dat = await Metodopago.findOne({ titulo: titulo.toUpperCase() })
//     if (dat) {
//         return res.status(httpCode[409].code).json({
//             data_send: "",
//             num_status: httpCode[409].code,
//             msg_status: 'Ya hay un método de pago con ése título.'
//         })
//     }

//     const newMP = new Metodopago({

//         titulo: titulo,
//         referencia: referencia,
//         paisid: paisid,
//         imagen: img.path
//     });

//     try {

//         await newMP.save();
//         return res.status(httpCode[201].code).json(
//             {
//                 data_send: newMP,
//                 num_status: httpCode[201].code,
//                 msg_status: 'Método de pago creado con éxito.'
//             });

//     } catch (error) {
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'Error en la conexión con el servidor, intente mas tarde (Metodopago)'
//         });
//     }
// }


// export const update = async (req: Request, res: Response): Promise<Response> => {
//     try {

//         const { id } = req.params;
//         const { paisid, titulo, referencia } = req?.body

//         if (id === null || id === undefined || !id || !ObjectId.isValid(id)
//             || paisid === null || paisid === undefined || !paisid || !ObjectId.isValid(paisid)) {
//             return res.status(httpCode[409].code).json({
//                 data_send: "",
//                 num_status: httpCode[409].code,
//                 msg_status: 'Id or paisid is invalid'
//             });
//         }
//         if (!titulo || titulo == null || titulo == undefined || titulo == "") {
//             return res.status(httpCode[409].code).json({
//                 data_send: "",
//                 num_status: httpCode[409].code,
//                 msg_status: httpCode[409].message + ', El título es requerido.'
//             });
//         }
//         if (!referencia || referencia == null || referencia == undefined || referencia == "") {
//             return res.status(httpCode[409].code).json({
//                 data_send: "",
//                 num_status: httpCode[409].code,
//                 msg_status: httpCode[409].message + ', La referencia  es requerida.'
//             });
//         }
//         const dat = await Metodopago.findById(id);

//         if (!dat) {
//             return res.status(httpCode[404].code).json({
//                 data_send: "",
//                 num_status: httpCode[404].code,
//                 msg_status: 'Metodopago not found'
//             });
//         }
//         var img = Object();
//         var imgpath;
//         img = req.file;
//         if (img && img != undefined && img != null) {
//             imgpath = img.path;
//             const storagePath = path.resolve(dat.imagen);
//             if (fs.existsSync(storagePath)) {
//                 await fs.unlink(storagePath);
//             }
//         } else {
//             imgpath = dat.imagen;
//         }

//         dat.titulo = titulo,
//             dat.referencia = referencia,
//             dat.paisid = paisid,
//             dat.imagen = imgpath
//         await dat.save();
//         const mp = await Metodopago.find({ _id: id })
//             .populate('paisid', 'nombre');
//         return res.status(httpCode[200].code).json({
//             data_send: mp,
//             num_status: httpCode[200].code,
//             msg_status: 'Método de pago modificado con éxito'
//         });
//     } catch (error) {
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'There was a problem trying to modify the Metodopago, try again later (Metodopago)'
//         });
//     }
// }

// export const deleteMetodopago = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { id } = req.params;

//         if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
//             return res.status(httpCode[409].code).json({
//                 data_send: "",
//                 num_status: httpCode[409].code,
//                 msg_status: 'Id is invalid'
//             });
//         }
//         const dat = await Metodopago.findOneAndUpdate({ _id: id },
//             {
//                 $set: {
//                     activo: false
//                 }
//             },
//             { new: true }
//         );
//         if (!dat) {
//             return res.status(httpCode[404].code).json({
//                 data_send: "",
//                 num_status: httpCode[404].code,
//                 msg_status: 'Método de pago no encontrado.'
//             });
//         }
//         return res.status(httpCode[200].code).json({
//             data_send: {
//                 nombre: dat.titulo.toUpperCase(),
//                 descripcion: dat.referencia.toUpperCase(),
//                 activo: dat.activo
//             },
//             num_status: httpCode[200].code,
//             msg_status: 'Método de pago eliminado con éxito.'
//         });

//     } catch (error) {
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'Error en la conexión con el servidor, intente mas tarde (Metodopago)'
//         });
//     }
// }

// export const activarMetodoPago = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { id } = req.params;

//         if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
//             return res.status(httpCode[409].code).json({
//                 data_send: "",
//                 num_status: httpCode[409].code,
//                 msg_status: 'Id is invalid'
//             });
//         }
//         const dat = await Metodopago.findOneAndUpdate({ _id: id },
//             {
//                 $set: {
//                     activo: true
//                 }
//             },
//             { new: true }
//         );
//         if (!dat) {
//             return res.status(httpCode[404].code).json({
//                 data_send: "",
//                 num_status: httpCode[404].code,
//                 msg_status: 'Metodopago not found'
//             });
//         }
//         return res.status(httpCode[200].code).json({
//             data_send: {
//                 nombre: dat.titulo.toUpperCase(),
//                 descripcion: dat.referencia.toUpperCase(),
//                 activo: dat.activo
//             },
//             num_status: httpCode[200].code,
//             msg_status: 'Metodopago actived successfully!'
//         });

//     } catch (error) {
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'Error en la conexión con el servidor, intente mas tarde (Metodopago)'
//         });
//     }
// }

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

        var img = Object();
        if (!img || img === undefined || img === null) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'La imagen no es válida.'
            });
        }
        img = req.file;


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


