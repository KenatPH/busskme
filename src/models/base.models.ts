import { Schema, model, Document } from "mongoose";
import { baseSchema } from "../schemas/base.schema";



export interface IBases extends Document {
    nombre: string,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IBases>('bases', baseSchema);