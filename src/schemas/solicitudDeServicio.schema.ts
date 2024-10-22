import { Schema, Document } from "mongoose";

export const solicitudServicioSchema = new Schema({
    solicitanteid: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Usuario que crea la solicitud
        required: true
    },
    estado: {
        type: String,
        enum: ['En espera', 'Aceptado', 'Completado', 'Cancelado', 'En viaje'],
        default: 'En espera'
    },
    aceptadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'User'  // Usuario que acepta la solicitud
    },
    ubicacionOrigen: {
        latitud: { type: Number, required: true },
        longitud: { type: Number, required: true }
    },
    ubicacionDestino: {
        latitud: { type: Number, required: true },
        longitud: { type: Number, required: true }
    },
    activo: {
        type: Boolean,
        default: true
    },
    inicioViaje: { type: Date, default: null },
    finViaje: { type: Date, default: null },
    distance:{ type: Number, required: true },
    costo:{ type: Number, required: true },
}, { versionKey: false, timestamps: true });
