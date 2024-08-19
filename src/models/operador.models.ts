import { Schema, model, Document } from "mongoose";
import { OperadorSchema } from "../schemas/operador.schema";

export interface IOperador extends Document {
    userid: Schema.Types.ObjectId,
    lugar_nacimiento: string,
    nro_rif: string,
    fecha_insc_rif: Date,
    fecha_emision_rif: Date,
    fecha_venc_rif: Date,
    fecha_venc_dni: Date,
    imagen_dni: string,
    nro_licencia: string,
    fecha_emision_lic: string,
    fecha_venc_lic: Date,
    grado_licencia: string,
    imagen_licencia: string,
    nro_cert_medico: string,
    fecha_emision_cermed: Date,
    fecha_venc_cermed: Date,
    grado_cermed: string,
    imagen_cermed: string,
    carga_familiar: number,
    grado_instruccion: Schema.Types.ObjectId,
    idiomas: string,
    aprobado: boolean,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IOperador>('Operador', OperadorSchema);