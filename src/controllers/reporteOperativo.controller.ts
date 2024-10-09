
import express, { Request, Response } from "express";
import ReporteOperativo from "../models/reporteOperativo.models";
import { ObjectId } from 'mongodb';
import { httpCode } from "../utils/httpStatusHandle";

export const getReporteOperativo = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
        return res.status(httpCode[409].code).json({
            data_send: "",
            num_status: httpCode[409].code,
            msg_status: 'El Id no es válido'
        });
    }
    const data = await ReporteOperativo.findById(id);

    try {
        if (!data) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'ReporteOperativo no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'ReporteOperativo encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const getDataReporteOperativos = async (req: Request, res: Response): Promise<Response> => {
    const data = await ReporteOperativo.find().populate('choferAnterior choferNuevo', ' nombre ').populate('vehiculoid');

    try {
        if (data.length === 0) {
            return res.status(httpCode[200].code).json({
                data_send: [],
                num_status: httpCode[200].code,
                msg_status: 'ReporteOperativo no encontrada'
            });
        }
        return res.status(httpCode[200].code).json({
            data_send: data,
            num_status: httpCode[200].code,
            msg_status: 'ReporteOperativo encontrada satisfactoriamente.'
        });
    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

export const deleteReporteOperativo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        if (id === null || id === undefined || !id || !ObjectId.isValid(id)) {
            return res.status(httpCode[409].code).json({
                data_send: "",
                num_status: httpCode[409].code,
                msg_status: 'El Id no es válido'
            });
        }

        const data = await ReporteOperativo.findOneAndDelete({_id:id});

        return res.status(httpCode[200].code).json({
            data_send: {},
            num_status: httpCode[200].code,
            msg_status: 'ReporteOperativo borrada satisfactoriamente.'
        });


    } catch (error) {
        return res.status(httpCode[500].code).json({
            data_send: "",
            num_status: httpCode[500].code,
            msg_status: 'There was a problem with the server, try again later '
        });
    }
}

// Función para actualizar solo la propiedad 'nota' en un ReporteOperativo
export const updateNotaReporteOperativo = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtener el ID del reporte operativo desde los parámetros de la URL
  const { nota } = req.body; // Obtener la nueva nota desde el cuerpo de la solicitud

  try {
    // Validar que el ID sea un ObjectId válido
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    // Buscar y actualizar solo el campo 'nota' del documento
    const updatedReporteOperativo = await ReporteOperativo.findById(
      id
    );

    // Si el reporte operativo no fue encontrado, lanzamos un error
    if (!updatedReporteOperativo) {
      return res.status(404).json({ message: 'Reporte Operativo no encontrado' });
    }

    updatedReporteOperativo.nota = nota
    await updatedReporteOperativo.save()

    return res.status(httpCode[200].code).json({
        data_send: {updatedReporteOperativo},
        num_status: httpCode[200].code,
        msg_status: 'Nota actualizada correctamente.'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};


