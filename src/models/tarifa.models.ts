import { Schema, model, Document } from "mongoose";
import { tarifaSchema } from "../schemas/tarifa.schema";



export interface ITarifa extends Document {
    nombre: string,
    monto: Number,
    cantidadMinimaParadas: Number,
    cantidadMaximaParadas: Number,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<ITarifa>('Tarifa', tarifaSchema);