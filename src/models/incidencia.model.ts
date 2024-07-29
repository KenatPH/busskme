import { Schema, model, Document } from "mongoose";
import { incidenciaSchema } from "../schemas/incidencia.schema";



export interface IIncidencia extends Document {

    vehiculoid: Schema.Types.ObjectId,
    rutaid: Schema.Types.ObjectId, 
    choferid: Schema.Types.ObjectId, 
    colectorid: string,
    baseid: string,
    fecha: Date,
    activo: boolean,
    descripcion: string,
    imagen: string,
    createdAt: Date,
    updateAt: Date
}

export default model<IIncidencia>('incidencias', incidenciaSchema);