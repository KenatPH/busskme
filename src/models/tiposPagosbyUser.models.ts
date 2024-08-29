import { Schema, model, Document } from "mongoose";
import { PaymentMethodByUserSchema } from "../schemas/tiposPagosbyUser.schema";



export interface ITiposPagosbyUser extends Document {
    type: string,
    userid: Schema.Types.ObjectId,
    details: any,
    createdAt: Date,
    updateAt: Date
}

export default model<ITiposPagosbyUser>('TiposPagosbyUser', PaymentMethodByUserSchema);