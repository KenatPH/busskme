import { model, Schema, Document } from 'mongoose';
import { solicitudServicioSchema } from '../schemas/solicitudDeServicio.schema';
  // Asegúrate de colocar la ruta correcta del esquema

// Interface que extiende de Document para asegurar el tipado
export interface ISolicitudServicio extends Document {
    solicitanteid: Schema.Types.ObjectId;
    estado: 'En espera' | 'Aceptado' | 'Completado' | 'Cancelado' | 'En viaje';
    aceptadoPor: Schema.Types.ObjectId;
    ubicacionOrigen: {
        latitud: number;
        longitud: number;
    };
    ubicacionDestino: {
        latitud: number;
        longitud: number;
    };
    activo: boolean;
    inicioViaje:  Date,
    finViaje:  Date,
    distance:number,
}

// Crear el modelo basado en el esquema
const SolicitudServicioModel = model<ISolicitudServicio>('SolicitudServicio', solicitudServicioSchema);

export default SolicitudServicioModel;
