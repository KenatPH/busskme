import { Schema, Document } from "mongoose";

export const incidenciaSchema = new Schema({

    vehiculoid: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    rutaid: {
        type: Schema.Types.ObjectId,
        ref: 'Ruta',
        required: true
    },
    choferid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
