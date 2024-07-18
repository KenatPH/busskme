import { Schema, Document } from "mongoose";

export const walletSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    activo: {
        type: Number,
        default: 1
    },
    balance_usd:{
        type: Schema.Types.Decimal128,
        default: 0
    },
    balance_bs:{
        type: Schema.Types.Decimal128,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});
