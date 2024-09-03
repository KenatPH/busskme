
import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";
import axios from "axios";

export const getETA = async (req: Request, res: Response): Promise<Response> => {
    // const { id } = req.params;
    const { originLat, originLng, userLat, userLng } = req.params;

    if (!originLat || !originLng || !userLat || !userLng) {
        // return res.status(400).json({ error: 'Parámetros inválidos' });
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'Parámetros inválidos'
        });
    }

    // https://maps.googleapis.com/maps/api/distancematrix/json?origins=10.9707264,-63.8418944&destinations=11.079022312234454,-63.97048097723263&key=AIzaSyCaMOe0kIYCylSuG8XmPNZhvQXnoW5wDO4

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
            params: {
                origins: `${originLat},${originLng}`,
                // origins: `${10.9707264},${-63.8418944}`,
                destinations: `${userLat},${userLng}`,
                // destinations: `${11.079022312234454},${-63.97048097723263}`,
                key: `AIzaSyCaMOe0kIYCylSuG8XmPNZhvQXnoW5wDO4`,
            },
        });

        // res.json(response.data);
        return res.status(httpCode[200].code).json({
            data_send: response.data,
            num_status: httpCode[200].code,
            msg_status: 'Base encontrada satisfactoriamente.'
        });
    } catch (error) {
        console.error('Error al obtener ETA:', error);
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        })
        
    }
}
