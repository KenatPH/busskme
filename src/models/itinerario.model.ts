import { Schema, model, Document } from "mongoose";
import { itinerarioSchema } from "../schemas/itinerario.schema";



export interface IItinerario extends Document {

    vehiculoid:Schema.Types.ObjectId,
    rutaid:Schema.Types.ObjectId,
    choferid:Schema.Types.ObjectId,
    colectorid:Schema.Types.ObjectId,
    baseid:Schema.Types.ObjectId,
    fecha: Date,
    hora_salida:string,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IItinerario>('itinerarios', itinerarioSchema);