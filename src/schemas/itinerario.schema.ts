import { Schema, Document } from "mongoose";

export const itinerarioSchema = new Schema({

    vehiculoid: {
        type: Schema.Types.ObjectId,
        ref:'Vehiculo',
        required: true
    },
    rutaid: {
        type: Schema.Types.ObjectId,
        ref:'Ruta',
        required: true
    },
    choferid: {
        type: Schema.Types.ObjectId,
        ref:'Chofer',
        required: true
    },
    colectorid: {
        type: Schema.Types.ObjectId,
        ref:'Chofer',
        required: true
    },
    baseid: {
        type: Schema.Types.ObjectId,
        ref:'Base',
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
