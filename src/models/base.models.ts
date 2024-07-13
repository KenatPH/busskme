import { Schema, model, Document } from "mongoose";
import { baseSchema } from "../schemas/base.schema";



export interface IBase extends Document {
    nombre: string,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IBase>('Base', baseSchema);