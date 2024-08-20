import express, { Request, Response } from "express";
import Pago from "../models/pago.models";
import Reserva from "../models/reserva.models";
import Tarifa from "../models/tarifa.models";
import Wallet from "../models/wallet.model";
import Ticket from "../models/ticket.models";
import Vehiculo from "../models/vehiculos/vehiculo.models";
import Itinerario from "../models/itinerario.model";
import Servicio from "../models/servicio.models";
import TarifaAdicional from "../models/tarifaAdicional.model"
import path from 'path';
import config from '../config/config';
import mongoose from "mongoose";
import User from "../models/users.models";
import { httpCode } from "../utils/httpStatusHandle";
import { ObjectId } from 'mongodb';
import fs from 'fs-extra';
import { crearNotificacion } from "./notificacion.controller";
import { populate } from "dotenv";


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
    const { userid, titulo, referencia, metodopagoid, servicioid, monto } = req?.body
    // const { titulo, referencia, nombre, telefono, cedula, userId, torneoId } = req.body;

    // if (!titulo || titulo == null || titulo == undefined || titulo == "") {
    //     return res.status(httpCode[409].code).json({
    //         data_send: "",
    //         num_status: httpCode[409].code,
    //         msg_status: httpCode[409].message + ', La titulo  es requerido.'
    //     });
    // }

    // if (!referencia || referencia == null || referencia == undefined || referencia == "") {
    //     return res.status(httpCode[409].code).json({
    //         data_send: "",
    //         num_status: httpCode[409].code,
    //         msg_status: httpCode[409].message + ', La referencia  es requerida.'
    //     });
    // }

    if (userid === null || userid === undefined || !userid || !ObjectId.isValid(userid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'userid no es válido'
        });
    }

    if (metodopagoid === null || metodopagoid === undefined || !metodopagoid || !ObjectId.isValid(metodopagoid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'metodopagoid no es válido'
        });
    }

    if (monto === null || monto === undefined || !monto ) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'monto no es válido'
        });
    }

    try {

        var img = Object(); let fotoReferencia = "";
        img = req.file;
        if (img != undefined && img !== null && img) {
            fotoReferencia = img.path ? img.path : "";
        } else {
            fotoReferencia = "";
        }   


        const pago = new Pago({
            titulo,
            referencia,
            // servicioid,
            metodopagoid,
            userid,
            monto,
            aprobado:false,
            imagen: fotoReferencia
        });

        await pago.save();

        const titulo1 = "Registro de pago";
        const cuerpo = `Se a registrado un pago a su cuenta`;
        const link = "";
        const notificacion = await crearNotificacion(titulo1, cuerpo, link, userid);


        if (!notificacion || notificacion.success === false) {
            console.log("fallo 1", notificacion);
            
            return res.status(409).json({
                data_send: "",
                num_status: httpCode[201].code,
                msg_status: notificacion.msg
            });
        }

        const titulo2 = "Registro de pago";
        const cuerpo1 = `Se a registrado un pago a su cuenta`;
        const link1 = "";
        const notificacion1 = await crearNotificacion(titulo2, cuerpo1, link1, null ,true );

        if (!notificacion1 || notificacion1.success === false) {
            console.log("fallo 2", notificacion1);
            return res.status(409).json({
                data_send: "",
                num_status: httpCode[201].code,
                msg_status: notificacion.msg
            });
        }


        return res.status(201).json(
            {
                data_send: pago,
                num_status: 0,
                msg_status: 'Pago creado correctamente.'
            });

    } catch (error) {
        console.log(error);
        
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

    const data = await Pago.find().populate('userid metodopagoid', 'nombre titulo').sort([['createdAt', 'desc']]).skip(offset).limit(10);

    try {

        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[204].code,
                msg_status: 'pagos no encontrados'
            });
        }

        return res.status(200).json(
            {
                data_send: data,
                num_status: 0,
                msg_status: 'Pago obtenidos correctamente.'
            });
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
}

export const getListPagosByUser = async (req: Request, res: Response): Promise<Response> => {

    const { pag, id } = req.params;
    const offset = (parseInt(pag) - 1) * 10

    let where: any = {}
    if (id) {
        where = { clubId: id }
    }

    const data = await Pago.find({userid:id}).populate('userid metodopagoid', 'nombre titulo').sort([['createdAt', 'desc']]).skip(offset).limit(10);

    try {

        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[204].code,
                msg_status: 'pagos no enconttrada'
            });
        }

        return res.status(200).json(
            {
                data_send: data,
                num_status: 0,
                msg_status: 'Pago obtenidos correctamente.'
            });

        // return res.status(201).json(data);
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



        data.aprobado = true
        await data.save()

        const user = await User.findById(data.userid)

        if (!user) {
            return res.status(200).json({
                data_send: "",
                num_status: 6,
                msg_status: 'usuario no Encontrado'
            });
        }

        const wallet = await Wallet.findOne({ userid: data.userid });

        if (!wallet) {
            return res.status(200).json({
                data_send: "",
                num_status: 6,
                msg_status: 'wallet no Encontrado'
            });
        }

        const suma = (a:any, b:any)=>{
            return parseFloat(a) + parseFloat(b);
        }

        
        wallet.balance_usd = (data && data.monto) ? suma(wallet.balance_usd, data.monto) : wallet.balance_usd;
        wallet.balance_bs = (data && data.monto) ? suma(wallet.balance_bs, data.monto) : wallet.balance_bs;
        await wallet.save();

        const titulo = "Pago Confirmado";
        const cuerpo = `Su pago fue confirmado con éxito`;
        // const link = `/resumenTorneo/${torneo.id}`;

        // console.log(data.user.id);
        
        await crearNotificacion(titulo, cuerpo, "", user._id);

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

export const pagarViaje = async (req: Request, res: Response): Promise<Response> => {

    const {ispreferencial, cantidad_pasajes, codigo_unidad} =  req.body

    const userid = req.user


    try {


        const reserva:any = await Reserva.findOne({ userid, activo: true }).populate('paradadestinoid paradaorigenid', 'nombre orden').populate({
            path: 'servicioid',
            populate: {
                path: 'itinerarioid',
                populate: [
                    {
                        path: 'vehiculoid',
                        select: 'colorid modeloid marcaid codigo_unidad',
                        populate: [
                            { path: 'colorid', select: 'color' },
                            { path: 'modeloid', select: 'nombre' },
                            { path: 'marcaid', select: 'nombre' }
                        ]
                    },
                    { path: 'choferid colectorid baseid rutaid', select: 'nombre genero fotoperfil' },
                ]
            }
        });
        
        if (!reserva) {
            return res.status(httpCode[404].code).json({
                data_send: [],
                num_status: httpCode[404].code,
                msg_status: 'Reserva no encontrada'
            });
        }
        let servicioid =  reserva.servicioid
        
        if (codigo_unidad){
            if (codigo_unidad === "" || codigo_unidad === undefined){
                return res.status(httpCode[404].code).json({
                    data_send: [],
                    num_status: httpCode[404].code,
                    msg_status: 'Reserva no encontrada y no suminitro codigo de unidad'
                });
            }
        }
        
        let choferId = reserva.servicioid.itinerarioid.choferid._id
        let vehiculo:any

        if (codigo_unidad.toUpperCase() !== reserva.servicioid.itinerarioid.vehiculoid.codigo_unidad.toUpperCase()){
            const vehi = await Vehiculo.findOne({ codigo_unidad: codigo_unidad })

            if (!vehi) {
                return res.status(httpCode[404].code).json({
                    data_send: [],
                    num_status: httpCode[400].code,
                    msg_status: 'Vehículo no enconttrado'
                });
            }

            const itin = await Itinerario.find({ vehiculoid: vehi._id })

            if (itin.length === 0) {
                return res.status(httpCode[404].code).json({
                    data_send: "",
                    num_status: httpCode[404].code,
                    msg_status: 'No Itinerario found'
                });
            }

            const arregloItinerarios = itin.map((it) => { return it._id })

            const Servs = await Servicio.findOne({ itinerarioid: { $in: arregloItinerarios }, finalizado: false }).populate({
                path: 'itinerarioid',
                populate: [
                    {
                        path: 'vehiculoid',
                        select: 'colorid modeloid marcaid codigo_unidad',
                        populate: [
                            { path: 'colorid', select: 'color' },
                            { path: 'modeloid', select: 'nombre' },
                            { path: 'marcaid', select: 'nombre' }
                        ]
                    },
                    { path: 'choferid colectorid baseid rutaid', select: 'nombre genero fotoperfil' },
                ]
            })

            if (!Servs) {
                return res.status(httpCode[404].code).json({
                    data_send: [],
                    num_status: httpCode[404].code,
                    msg_status: 'servicio no enconttrado'
                });
            }
            servicioid = Servs._id
            choferId = vehiculo.choferid    
        }

        const calculoParadas = (a:number, b:number) => {
            if (b > a) {
                return b - a;
            } else {
                return a - b;
            }
        }

        const cantidadParadasRecorridas = calculoParadas(reserva.paradaorigenid.orden, reserva.paradadestinoid.orden)

        const tarifa = await Tarifa.findOne({
            cantidadMinimaParadas: { $lte: cantidadParadasRecorridas },
            cantidadMaximaParadas: { $gte: cantidadParadasRecorridas }
        });


        if (!tarifa) {
            return res.status(httpCode[404].code).json({
                data_send: [],
                num_status: httpCode[404].code,
                msg_status: 'tarifa no encontrada'
            });
        }

        let cantidad_de_pasajes_a_pagar = cantidad_pasajes

        if (ispreferencial){

            const walletUser = await Wallet.findOne({ userid: userid })
    
            if (!walletUser) {
                return res.status(httpCode[404].code).json({
                    data_send: "",
                    num_status: httpCode[404].code,
                    msg_status: 'wallet no encontrada.'
                });
            } else {
                const validaMonto = (a: any, b: any) => {
                    const wall = parseFloat(a)
                    const mont = parseFloat(b)
    
                    if (wall >= mont) {
                        return true
                    } else {
                        return false
                    }
                }
    
                const resta = (a: any, b: any) => {
                    return parseFloat(a) - parseFloat(b);
                }
    
                if (validaMonto(walletUser.balance_bs, 1)) {
    
                    walletUser.balance_bs = resta(walletUser.balance_bs, 1)
                    walletUser.balance_usd = resta(walletUser.balance_usd, 1)
    
                    await walletUser.save()

                    const newTicket = new Ticket({
                        userid,
                        servicioid: servicioid,
                        monto:0,
                        pagado: true,
                        preferencial:true
                    });

                    await newTicket.save();

                    cantidad_de_pasajes_a_pagar = cantidad_de_pasajes_a_pagar - 1
    
                } else {
                    return res.status(httpCode[404].code).json({
                        data_send: {},
                        num_status: httpCode[404].code,
                        msg_status: 'saldo en wallet insuficiente.'
                    });
                }
            }
        }

        // const diaSemana = new Date().getDay();

        let costoTotal:any = tarifa.monto;

        // // Verificar si es fin de semana
        // if (diaSemana === 0 || diaSemana === 6) {
        //     const tarifaFinDeSemana = await TarifaAdicional.findOne({ tipo: 'finDeSemana' });

        //     if (tarifaFinDeSemana) {
        //         costoTotal += tarifaFinDeSemana.monto;
        //     }
        // }

        const tikets_no_preferenciales:any = []
        for (let i = 0; i < cantidad_de_pasajes_a_pagar; i++) {
            tikets_no_preferenciales.push({
                userid,
                servicioid: servicioid,
                monto: costoTotal ,
                pagado: true
            })
        }

        if (tikets_no_preferenciales.length > 0){
            await Ticket.insertMany(tikets_no_preferenciales);
        }

        const titulo1 = "Servicio pagado con exito";
        const cuerpo = `Se a registrado un pago de ${cantidad_pasajes} pasaje/s `;
        const link = "";
        const notificacion = await crearNotificacion(titulo1, cuerpo, link, choferId);


        if (!notificacion || notificacion.success === false) {
            console.log("fallo 1", notificacion);

            return res.status(409).json({
                data_send: "",
                num_status: httpCode[201].code,
                msg_status: notificacion.msg
            });
        }


        return res.status(201).json(
            {
                data_send: "",
                num_status: httpCode[201].code,
                msg_status: 'Pago creado correctamente.'
            });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error
        })
    }
}
