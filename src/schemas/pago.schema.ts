import { Schema, Document } from "mongoose";

export const pagoSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    servicioid:{
        type: String,      
    },
    metodopagoid: {
        type: String,
        ref: 'Metodopago',
        required: true
    },
    referencia: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    activo: {
        type: Boolean,
        default: true
    },
    aprobado:{
        type: Boolean,
        default: true
    }
}, { versionKey: false, timestamps: true }
);
