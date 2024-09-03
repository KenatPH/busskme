import { Schema, Document } from "mongoose";

export const PaymentMethodByUserSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['credit_card', 'debit_card', 'pago_movil', 'transferencia_bancaria']
    },
    details: {
        type: Schema.Types.Mixed,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const CardSchema = new Schema({
    cardNumber: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: String,
        required: true,
    },
    cardHolderName: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
});

export const PagoMovilSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
});

export const TransferSchema = new Schema({
    bankName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    accountHolderName: {
        type: String,
        required: true,
    },
    accountType:{
        type: String,
        required: true,      
    },
    idNumber: {
        type: String,
        required: true,
    },
});

