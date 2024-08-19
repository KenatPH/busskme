import { Schema, model, Document } from "mongoose";
import { baseSchema } from "../schemas/base.schema";



export interface IReporteOperativo extends Document {
    vehiculoId: Schema.Types.ObjectId,
    choferAnterior: String,
    choferNuevo: String,
    fechaCambio:Date,
    createdAt: Date,
    updateAt: Date
}

export default model<IReporteOperativo>('ReporteOperativo', baseSchema);