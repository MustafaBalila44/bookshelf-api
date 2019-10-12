import { Document, Schema, model } from "mongoose";

export type CategoryDocument = Document & {
    id: any;
    _id: any;
    name: string;
    books: any[]
};

// tslint:disable: object-literal-sort-keys
const categorySchema = new Schema({
    name: {
        type: String,
        minlength: 1,
        required: true,
        index: true,
    },
});

export const Category = model<CategoryDocument>("Category", categorySchema);
