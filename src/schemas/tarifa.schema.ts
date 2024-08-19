import { Schema, Document } from "mongoose";

export const tarifaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidadMinimaParadas: {
        type: Number,
        required: true
    },
    cantidadMaximaParadas: {
        type: Number,
        required: true
    },
    monto: {
        type: Schema.Types.Decimal128,
        default: 0
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
