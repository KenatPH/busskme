import { Schema, Document } from "mongoose";

export const servicioSchema = new Schema({
    itinerarioid: {
        type: Schema.Types.ObjectId,
        ref: 'Ruta'
    },
    finalizado: {
        type: Boolean,
        default: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { versionKey: false, timestamps: true }
);
