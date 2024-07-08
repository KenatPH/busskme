import { Schema, model, Document } from "mongoose";
import { itinerarioSchema } from "../schemas/itinerario.schema";



export interface IItinerario extends Document {

    vehiculoid:string,
    rutaid:string,
    choferid:string,
    colectorid:string,
    baseid:string,
    fecha: Date,
    hora_salida:string,
    activo: boolean,
    createdAt: Date,
    updateAt: Date
}

export default model<IItinerario>('itinerarios', itinerarioSchema);