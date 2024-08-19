import { Schema, Document } from "mongoose";

export const reservaSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    servicioid: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio'
    },
    paradaorigenid:{
        type: Schema.Types.ObjectId,
        ref: 'Parada'
    },
    paradadestinoid: {
        type: Schema.Types.ObjectId,
        ref: 'Parada'
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { versionKey: false, timestamps: true }
);
