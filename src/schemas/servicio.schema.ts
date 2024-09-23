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
    },
    tipoTaxi: {
        type: Boolean,
        default: false
    },
    vehiculoid: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo'
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { versionKey: false, timestamps: true }
);
