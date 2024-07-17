import { Schema, Document } from "mongoose";

export const incidenciaSchema = new Schema({

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
    },
    baseid: {
        type: String,
    },
    fecha: {
        type: Date,
    },
    descripcion:{
        type: String,
    },
    activo: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String
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
