import { Document, Schema, Error, model } from "mongoose";

export type BookDocument = Document & {
    name: string;
    priceSdg: number;
    priceXp: number;
    author: string;
};

// tslint:disable: object-literal-sort-keys
const bookSchema = new Schema({
    name: {
        type: String,
        minlength: 5,
        required: true,
        match: /[a-zA-Z0-9_]/,
    },
    priceSdg: {
        type: Number,
        default: 0,
        required: true,
        min: 0,
    },
    priceXp: {
        type: Number,
        default: 0,
        required: true,
        min: 0,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
});

export const Book = model<BookDocument>("Book", bookSchema);
