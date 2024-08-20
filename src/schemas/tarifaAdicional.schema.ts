
import { Schema, Document } from "mongoose";

export const TarifaAdicionalSchema = new Schema({
    tipo: { type: String, enum: ['finDeSemana', 'feriado'], required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, required: false },
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
