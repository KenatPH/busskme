

import { Schema, Document } from "mongoose";

export const ticketSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    servicioid: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio'
    },
    monto: {
        type: Number
    },
    pagado: {
        type: Boolean,
        default: false
    },
    activo: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
    

});
