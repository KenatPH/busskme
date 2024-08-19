import { Schema, model, Document } from "mongoose";
import { notificacionSchema } from "../schemas/notificacion.schema";


export interface INotificaciones extends Document {
    userid: string,
    cuerpo: string,
    titulo: string,
    leida: boolean,
    admin: boolean,
    fecha: Date,
    link: string,
    createdAt: Date,
    updateAt: Date
}

export default model<INotificaciones>('notificaciones', notificacionSchema);