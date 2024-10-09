import { Schema, Document } from "mongoose";

export const reporteOperativoSchema = new Schema({

    vehiculoid: {
        type: Schema.Types.ObjectId,
        ref: "Vehiculo"
    },
    choferAnterior: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    choferNuevo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    nota: {
        type: String
    },
    fechaCambio: { 
        type: Date, 
        default: Date.now 
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
