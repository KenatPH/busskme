import { Schema, model, Document } from "mongoose";
import { tipoPreferencial } from "../schemas/tipoPreferencial.schema";



export interface ITipoPreferencial extends Document {
    nombre: string,
    monto: string,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<ITipoPreferencial>('TipoPreferencial', tipoPreferencial);