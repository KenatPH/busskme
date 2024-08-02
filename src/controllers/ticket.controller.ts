
import express, { Request, Response } from "express";
import Ticket from "../models/ticket.models";
import Wallet from "../models/wallet.model";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";
import utilsHandle from "../utils/utilsHandle";
import { crearNotificacion } from "./notificacion.controller";

export const getTicket = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await Ticket.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Ticket no encontrado'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'Ticket encontrado satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataTicket = async (req: Request, res: Response): Promise<Response> => {
    
    const data = await Ticket.find().populate({
        path:'servicioid',
        populate:[
            {
                path: 'itinerarioid',
                populate: [
                    {
                        path: 'vehiculoid',
                        select: 'colorid modeloid marcaid',
                        populate: [
                            { path: 'colorid', select: 'color' },
                            { path: 'modeloid', select: 'nombre' },
                            { path: 'marcaid', select: 'nombre' }
                        ]
                    },
                    { path: 'choferid colectorid baseid rutaid', select: 'nombre genero fotoperfil' },
                ]
}
        ]
    }).populate('userid','nombre');

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tickets no encontrados'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'tickets encontrados satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getTicketByUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const data = await Ticket.find({ userid:id});

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tickets no encontrados'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'tickets encontrados satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getTicketNoPayByService = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const data = await Ticket.find({ servicioid: id, pagado:false});

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Tickets no encontrados'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'tickets encontrados satisfactoriamente.'
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

    const { userid,
        servicioid,
        monto } = req?.body

    if (!utilsHandle.validateFieldID(userid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'userid no es válido'
        });
    }

    if (!utilsHandle.validateFieldID(servicioid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'servicioid no es válido'
        });
    }

    if (!utilsHandle.validateFieldNum(monto)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'monto no es válido'
        });
    }


    const newTicket = new Ticket({
        userid,
        servicioid,
        monto
    });

    try {

        await newTicket.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newTicket,
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

export const createSimple = async (req: Request, res: Response): Promise<Response> => {

    const { userid,
        servicioid,
        monto } = req.body

    console.log(req.body);
    

    if (!utilsHandle.validateFieldID(userid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'userid no es válido'
        });
    }

    if (!utilsHandle.validateFieldID(servicioid)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'servicioid no es válido'
        });
    }

    if (!utilsHandle.validateFieldNum(monto)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'monto no es válido'
        });
    }

    const walletUser = await Wallet.findOne({ userid: userid })

    if(!walletUser){
        return res.status(httpCode[404].code).json({
            data_send: "",
            num_status: httpCode[404].code,
            msg_status: 'wallet no encontrada.'
        });
    }else{
        const validaMonto = (a:any, b:any)=>{
            const wall = parseFloat(a)
            const mont = parseFloat(b)

            if(wall >= mont){
                return true
            }else{
                return false
            }
        }

        const resta = (a: any, b: any) => {
            return parseFloat(a) - parseFloat(b);
        }
        
        if (validaMonto(walletUser.balance_bs, monto)){

            walletUser.balance_bs = resta(walletUser.balance_bs, monto)
            walletUser.balance_usd = resta(walletUser.balance_usd, monto)

            await walletUser.save()

        }else{
            return res.status(httpCode[404].code).json({
                data_send: {},
                num_status: httpCode[404].code,
                msg_status: 'monto insuficiente.'
            });
        }
    }


    const newTicket = new Ticket({
        userid,
        servicioid,
        monto,
        pagado:true
    });


    const titulo = "Pasaje pagado Con éxito";
    const cuerpo = `El ticket de su pasaje fue pagado satisfactoriamente`;
    // const link = `/resumenTorneo/${torneo.id}`;

    // console.log(data.user.id);

    await crearNotificacion(titulo, cuerpo, "", userid);


    try {

        await newTicket.save();

        return res.status(httpCode[201].code).json(
            {
                data_send: newTicket,
                num_status: httpCode[201].code,
                msg_status: 'pasaje pagado satisfactoriamente.'
            });

    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const deleteticket = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await Ticket.findById(id);

        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'Ticket no encontrada.'
            });
        } else {
            if (data.activo === true) {
                data.activo = false;

                await data.save();
                return res.status(httpCode[200].code).json({
                    data_send: {},
                    num_status: httpCode[200].code,
                    msg_status: 'ticket borrado satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: data,
                    num_status: httpCode[200].code,
                    msg_status: 'ticket ya se encuentra con estatus eliminado.'
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

        const data = await Ticket.findById(id);

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
                    msg_status: 'Base activada satisfactoriamente.'
                });
            } else {
                return res.status(httpCode[200].code).json({
                    data_send: data,
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
