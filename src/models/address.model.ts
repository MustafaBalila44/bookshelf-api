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
        required: true,
    },
    neighborhood: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    locallity: {
        type: String,
        required: true,
    },
});

export const Address = model<AdressDocument>("Address", addressSchema);
