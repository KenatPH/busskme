import { Schema, model, Document } from "mongoose";
import { baseSchema } from "../schemas/base.schema";
import { reservaSchema } from "../schemas/reserva.schema";



export interface IReserva extends Document {
    servicioid: Schema.Types.ObjectId,
    userid: Schema.Types.ObjectId,
    paradaorigenid: Schema.Types.ObjectId,
    paradadestinoid: Schema.Types.ObjectId,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IReserva>('Reserva', reservaSchema);