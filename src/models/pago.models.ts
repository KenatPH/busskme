import { Schema, model, Document, ObjectId } from "mongoose";
import { pagoSchema } from "../schemas/pago.schema";

export interface IPago extends Document {
    userid: Schema.Types.ObjectId,
    servicioid: string,
    metodopagoid:string,
    tipopagoid: Schema.Types.ObjectId,
    referencia: string,
    monto:Number,
    imagen: string,
    activo: boolean,
    aprobado: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IPago>('Pago', pagoSchema);