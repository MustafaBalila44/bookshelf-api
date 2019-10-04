import { Document, Schema, Error, model, SchemaType } from "mongoose";
import bcrypt from "bcryptjs";
import { Cart, CartDocument } from "./cart.model";
import { OrderDocument } from "./order.model";
import { AdressDocument } from "./address.model";

export type UserDocument = Document & {
    // user defenition
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    dateOfBirth: Date;
    address: AdressDocument;
    points: number;
    phone: string;
    privileges: any[];
    orders: OrderDocument[],
    cart: CartDocument;
    comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

// tslint:disable: object-literal-sort-keys
const userSchema = new Schema({
    // user schema
    email: {
        type: String,
        minlength: 5,
        required: [true, "Email is required."],
        index: true,
        unique: true,
    },
    firstName: {
        type: String,
        minlength: 3,
        required: [true, "First Name is required."],

    },
    lastName: {
        type: String,
        minlength: 3,
        required: [true, "Last Name is required."],

    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required."],
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
        required: [true, "Phone number is required."],
    },
    privileges: {
        type: Array,
        default: [],
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: [true, "Address is required."],
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
    },
    orders: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "Order",
    }
});

const comparePassword: comparePasswordFunction = function (password: string, cb: Function) {
    bcrypt.compare(password, this.password, (err: Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", function (next) {
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

export const User = model<UserDocument>("User", userSchema);
