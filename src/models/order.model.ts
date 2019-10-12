import { Document, Schema, Error, model } from "mongoose";
import { BookDocument } from "./book.model";

export type OrderDocument = Document & {
    user: any;
    deliverer: any;
    date: Date;
    booksCount: number;
    cancelled: boolean;
    books: BookDocument[];
    priceSDG: number;
    priceXP: number;
    status: string;
    delivereyPrice: number;
};

// tslint:disable: object-literal-sort-keys
export const orderSchema = new Schema({
    priceSDG: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    books: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "Book"
    },
    priceXP: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    note: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "processing",
        enum: ["going", "processing", "finished",],
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deliverer: {
        type: Schema.Types.ObjectId,
        ref: "Deliverer",
    },
    date: {
        type: Date,
        default: new Date()
    },
    totalPrice: {
        type: Number,
        min: 0,
        required: true,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ["trading", "purchase"],
        required: [true, "An order must have a type"],
    }
});

orderSchema.virtual("booksCount").get(function () {
    return this.books.length;
});

export const Order = model<OrderDocument>("order", orderSchema);