import { Schema, Document } from "mongoose";

export const itinerarioSchema = new Schema({

    vehiculoid: {
        type: String,
        required: true
    },
    rutaid: {
        type: String,
        required: true
    },
    choferid: {
        type: String,
        required: true
    },
    colectorid: {
        type: String,
        required: true
    },
    baseid: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
    },
    hora_salida: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
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
