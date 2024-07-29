
import { Schema, model, Document } from "mongoose";

export const notificacionSchema = new Schema({
    userid: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cuerpo: {
        type: String
    },
    leida: { 
        type: Boolean,
        default: false
    },
    admin:{
        type: Boolean,
        default: false
    },
    titulo: {
        type: String
    },
    fecha: {
        type: String
    },
    link: {
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
}, { versionKey: false, timestamps: true }
);
