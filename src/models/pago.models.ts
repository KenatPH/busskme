import { Schema, model, Document, ObjectId } from "mongoose";
import { pagoSchema } from "../schemas/pago.schema";

export interface IPago extends Document {
    userid: Schema.Types.ObjectId,
    servicioid: string,
    metodopagoid:string,
    referencia: string,
    imagen: string,
    activo: boolean,
    confirmado: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IPago>('Pago', pagoSchema);