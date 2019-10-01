import { Document, Schema, Error, model } from "mongoose";
import { CategoryDocument } from "./category";

export type BookDocument = Document & {
    name: string;
    priceSdg: number;
    priceXp: number;
    author: string;
    descrisption: string;
    note: string;
    pages: number;
    status: string;
    category: CategoryDocument;
};

// tslint:disable: object-literal-sort-keys
const bookSchema = new Schema({
    name: {
        type: String,
        minlength: 5,
        required: true,
        index: true,
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
    description: {
        type: String,
    },
    note: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
         required: false,
    },
    pages: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
    },
    image: {
        type: String,
        
        //default: "http://localhost:8000/api/books/images/book.jpg",
        required: true,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
});

export const Book = model<BookDocument>("Book", bookSchema);
