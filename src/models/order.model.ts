import { Document, Schema, Error, model } from "mongoose";

export type OrderDocument = Document & {
    user: any;
    deliverer: any;
    date: Date;
    booksCount: number;
    priceSDG: number;
    priceXP: number;
    status: string[];
    delivereyPrice: number;
};

// tslint:disable: object-literal-sort-keys
const orderSchema = new Schema({
    booksCount: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    priceSDG: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    priceXP: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    status: {
        type: String,
        enum: ['going', 'processing', 'finished'],
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deliverer: {
        type: Schema.Types.ObjectId,
        ref: 'Deliverer',
        required: true,
    },
    delivereyPrice: {
        type: Number,
        min: 0,
        required: true,
    },
});

export const Author = model<OrderDocument>("Order", orderSchema);
