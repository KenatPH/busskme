import { Schema, model, Document } from "mongoose";
import { walletSchema } from "../schemas/wallet.schema";


export interface IWallet extends Document {
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    activo: number,
    balance_usd:number,
    balance_bs: number,
    createdAt: Date,
    updateAt: Date
}

export default model<IWallet>('Wallet', walletSchema);