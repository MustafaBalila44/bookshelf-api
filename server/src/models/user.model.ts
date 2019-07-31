import { Document, Schema, Error, model } from "mongoose";
import bcrypt from 'bcryptjs';
import { Cart } from "./cart.model";

export type UserDocument = Document & {
    // user defenition
    email: string;
    password: string;
    dateOfBirth: Date;
    address: any;
    points: number;
    privilages: any[];
    cart: any;
    comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

// tslint:disable: object-literal-sort-keys
const userScheam = new Schema({
    // user shcema
    email: {
        type: String,
        minlength: 5,
        required: true,
        index: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
        required: true,
        min: 0,
    },
    phone: {
        type: String,
        // match: /{0-9}{0-9}{0-9}/,
        required: true,
    },
    privilages: {
        type: Array,
        default: [],
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
    },
});

const comparePassword: comparePasswordFunction = function (password: string, cb: Function) {
    bcrypt.compare(password, this.password, (err: Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userScheam.methods.comparePassword = comparePassword;

userScheam.pre("save", function (next) {
    const user = this as UserDocument;
    if (!user.isModified()) {
        return next();
    }

    bcrypt.hash(user.password, 8, async (err: Error, hash) => {
        const cart = await Cart.create({ user: user.id });
        user.cart = cart.id;
        if (err) { return next(err); }
        user.password = hash;
        next();
    });

});

export const User = model<UserDocument>("User", userScheam);
