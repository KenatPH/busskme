import { Schema, Document } from "mongoose";

export const baseSchema = new Schema({

    vehiculoId: {
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
