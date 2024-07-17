import { Schema, model, Document } from "mongoose";
import { tipoPagoSchema } from "../schemas/tipoPago.schema";


export interface ITipoPago extends Document {
    nombre: string, 
    activo: number,
    createdAt: Date,
    updateAt: Date
}

export default model<ITipoPago>('TipoPago', tipoPagoSchema);