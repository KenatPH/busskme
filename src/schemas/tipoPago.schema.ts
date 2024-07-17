import { Schema, Document } from "mongoose";

export const tipoPagoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    activo: {
        type: Number,
        default: 1
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