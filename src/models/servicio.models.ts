import { Schema, model, Document } from "mongoose";
import { servicioSchema } from "../schemas/servicio.schema";


export interface IServicio extends Document {
    itinerarioid: Schema.Types.ObjectId,
    finalizado: boolean,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IServicio>('Servicio', servicioSchema);