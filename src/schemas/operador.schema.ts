import { Schema, model, Document } from "mongoose";

export const OperadorSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    lugar_nacimiento: {
        type: String
    },
    nro_rif: {
        type: String
    },
    fecha_insc_rif: {
        type: Date
    },
    fecha_emision_rif: {
        type: Date
    },
    fecha_venc_rif: {
        type: Date
    },
    fecha_venc_dni: {
        type: Date
    },
    imagen_dni: {
        type: String
    },
    nro_licencia: {
        type: String
    },
    fecha_emision_lic: {
        type: Date
    },
    fecha_venc_lic: {
        type: Date
    },
    grado_licencia: {
        type: String
    },
    imagen_licencia: {
        type: String
    },
    nro_cert_medico: {
        type: String
    },
    fecha_emision_cermed: {
        type: Date
    },
    fecha_venc_cermed: {
        type: Date
    },
    grado_cermed: {
        type: String
    },
    imagen_cermed: {
        type: String
    },
    carga_familiar: {
        type: Number
    },
    grado_instruccion: {
        type: Schema.Types.ObjectId,
        ref: 'Educacion'
    },
    idiomas: {
        type: String
    },
    aprobado: {
        type: Boolean,
        default: false
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { versionKey: false, timestamps: true }
);