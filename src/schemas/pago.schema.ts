import { Schema, Document } from "mongoose";

export const pagoSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'Pais'
    },
    servicioid:{
        type: String,      
    },
    tipoid: {
        type: String,
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
