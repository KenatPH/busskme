
import express, { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";
import axios from "axios";

// export const getETA = async (req: Request, res: Response): Promise<Response> => {
//     // const { id } = req.params;
//     const { originLat, originLng, userLat, userLng } = req.params;

//     if (!originLat || !originLng || !userLat || !userLng) {
//         // return res.status(400).json({ error: 'Parámetros inválidos' });
//         return res.status(httpCode[409].code).json({
//             data_send: "",
//             num_status: httpCode[409].code,
//             msg_status: 'Parámetros inválidos'
//         });
//     }

//     // https://maps.googleapis.com/maps/api/distancematrix/json?origins=10.9707264,-63.8418944&destinations=11.079022312234454,-63.97048097723263&key=AIzaSyCaMOe0kIYCylSuG8XmPNZhvQXnoW5wDO4

//     try {
//         const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
//             params: {
//                 origins: `${originLat},${originLng}`,
//                 // origins: `${10.9707264},${-63.8418944}`,
//                 destinations: `${userLat},${userLng}`,
//                 // destinations: `${11.079022312234454},${-63.97048097723263}`,
//                 key: `AIzaSyCaMOe0kIYCylSuG8XmPNZhvQXnoW5wDO4`,
//             },
//         });

//         // res.json(response.data);
//         return res.status(httpCode[200].code).json({
//             data_send: response.data,
//             num_status: httpCode[200].code,
//             msg_status: 'Base encontrada satisfactoriamente.'
//         });
//     } catch (error) {
//         console.error('Error al obtener ETA:', error);
//         return res.status(httpCode[500].code).json({
//             data_send: "",
//             num_status: httpCode[500].code,
//             msg_status: 'There was a problem with the server, try again later '
//         })
        
//     }
// }


export const getETA = async (req: Request, res: Response): Promise<Response> => {
  const { originLat, originLng, userLat, userLng } = req.params;

  if (!originLat || !originLng || !userLat || !userLng) {
    return res.status(httpCode[409].code).json({
      data_send: "",
      num_status: httpCode[409].code,
      msg_status: 'Parámetros inválidos',
    });
  }

  try {
    const etaData = await GoogleMapsService.getETA({
      originLat,
      originLng,
      destinationLat: userLat,
      destinationLng: userLng,
    });

    return res.status(httpCode[200].code).json({
      data_send: etaData,
      num_status: httpCode[200].code,
      msg_status: 'encontrada satisfactoriamente.',
    });
  } catch (error) {
    console.error('Error al obtener ETA:', error);
    return res.status(httpCode[500].code).json({
      data_send: "",
      num_status: httpCode[500].code,
      msg_status: 'There was a problem with the server, try again later',
    });
  }
};

interface GetETAParams {
  originLat: string;
  originLng: string;
  destinationLat: string;
  destinationLng: string;
}

export class GoogleMapsService {
  private static API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  private static API_KEY = 'AIzaSyCaMOe0kIYCylSuG8XmPNZhvQXnoW5wDO4'; // Debes reemplazarlo con tu clave de Google Maps

  public static async getETA({ originLat, originLng, destinationLat, destinationLng }: GetETAParams) {
    try {
      const response = await axios.get(this.API_URL, {
        params: {
          origins: `${originLat},${originLng}`,
          destinations: `${destinationLat},${destinationLng}`,
          key: this.API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener ETA:', error);
      throw new Error('Error al comunicarse con Google Maps');
    }
  }
}
