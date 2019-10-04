import { Document, Schema, Error, model } from "mongoose";

export type AuthorDocument = Document & {
    firstName: string;
    lastName: string;
    about: string;
    books: any[];
};
// tslint:disable: object-literal-sort-keys
const authorSchema = new Schema({
    firstName: {
        type: String,
        minlength: 2,
        required: true,
        //match: /[a-zA-Z0-9_]/,
    },
    lastName: {
        type: String,
        min: 2,
        required: true,
        //match: /[a-zA-Z0-9_]/,
    },
    books: {
        type: [Schema.Types.ObjectId],
        ref: 'Book',
        default: [],
    },
    about: {
        type: String,
        required: true,
    },
});

export const Author = model<AuthorDocument>("Author", authorSchema);
