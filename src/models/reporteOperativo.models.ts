import { Schema, model, Document } from "mongoose";
import { reporteOperativoSchema } from "../schemas/reporteOperativo.schema";



export interface IReporteOperativo extends Document {
    vehiculoid: Schema.Types.ObjectId,
    choferAnterior: Schema.Types.ObjectId,
    choferNuevo: Schema.Types.ObjectId,
    nota:String, 
    fechaCambio:Date,
    createdAt: Date,
    updateAt: Date
}

export default model<IReporteOperativo>('ReporteOperativo', reporteOperativoSchema);