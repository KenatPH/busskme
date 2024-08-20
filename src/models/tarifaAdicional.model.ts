import { Schema, model, Document } from "mongoose";
import { TarifaAdicionalSchema } from "../schemas/tarifaAdicional.schema";


export interface ITarifaAdicional extends Document {
    tipo:String,
    monto: Number,
    fecha:  Date,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<ITarifaAdicional>('TarifaAdicional', TarifaAdicionalSchema);