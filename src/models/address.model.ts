import { Document, Schema, model } from "mongoose";

export type AdressDocument = Document & {
    street: string;
    neighborhood: string;
    state: string;
    locallity: string;
};

// tslint:disable: object-literal-sort-keys
const addressSchema = new Schema({
    street: {
        type: String,
        minlength: 5,
        required: true,
        match: /[a-zA-Z0-9]/,
    },
    neighborhood: {
        type: String,
        minlength: 5,
        required: true,
        match: /[a-zA-Z0-9]/,
    },
    state: {
        type: String,
        minlength: 5,
        required: true,
        match: /[a-zA-Z0-9]/,
    },
    locallity: {
        type: String,
        minlength: 5,
        required: true,
        match: /[a-zA-Z0-9]/,
    },
});

export const Address = model<AdressDocument>("Address", addressSchema);
