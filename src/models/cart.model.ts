import { Document, Schema, model } from "mongoose";
import { BookDocument } from "./book.model";

export type CartDocument = Document & {
    id: any;
    _id: any;
    user: any;
    books: any
    price: number;
};

// tslint:disable: object-literal-sort-keys
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
        min: 0,
    },
    books: {
        type: [Schema.Types.ObjectId],
        ref: 'Book',
    },
});

export const Cart = model<CartDocument>("Cart", cartSchema);
