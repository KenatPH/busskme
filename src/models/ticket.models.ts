import { Schema, model, Document } from "mongoose";
import { ticketSchema } from "../schemas/ticket.schema";



export interface ITicket extends Document {
    userid: Schema.Types.ObjectId,
    servicioid: Schema.Types.ObjectId,
    monto: Number,
    pagado: boolean,
    activo:boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<ITicket>('Ticket', ticketSchema);