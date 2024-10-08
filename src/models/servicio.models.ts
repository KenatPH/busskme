import { Schema, model, Document } from "mongoose";
import { servicioSchema } from "../schemas/servicio.schema";


export interface IServicio extends Document {
    itinerarioid: Schema.Types.ObjectId,
    finalizado: boolean,
    activo: boolean,
    latitud: String,
    longitud: String,
    tipoTaxi:boolean,
    userid:boolean,
    cantidadPasajeros:number,
    createdAt: Date,
    updateAt: Date
}

export default model<IServicio>('Servicio', servicioSchema);