import { Schema, model, Document } from "mongoose";
import { incidenciaSchema } from "../schemas/incidencia.schema";



export interface IIncidencia extends Document {

    vehiculoid: string,
    rutaid: string,
    choferid: string,
    colectorid: string,
    baseid: string,
    fecha: Date,
    activo: boolean,
    imagen: string,
    createdAt: Date,
    updateAt: Date
}

export default model<IIncidencia>('incidencias', incidenciaSchema);