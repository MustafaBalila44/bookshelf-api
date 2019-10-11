"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
exports.orderSchema = new mongoose_1.Schema({
    priceSDG: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    books: {
        type: [mongoose_1.Schema.Types.ObjectId],
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deliverer: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.orderSchema.virtual("booksCount").get(function () {
    return this.books.length;
});
exports.Order = mongoose_1.model("order", exports.orderSchema);
//# sourceMappingURL=order.model.js.map