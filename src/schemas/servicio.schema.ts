import { Schema, Document } from "mongoose";

export const servicioSchema = new Schema({
    itinerarioid: {
        type: Schema.Types.ObjectId,
        ref: 'itinerarios'
    },
    finalizado: {
        type: Boolean,
        default: false
    },
    latitud: {  //nombre o descripción de la ruta RUTA 201
        type: String,
    },
    longitud: {  //nombre o descripción de la ruta RUTA 201
        type: String,
    },    
    activo: {
        type: Boolean,
        default: true
    }
}, { versionKey: false, timestamps: true }
);
