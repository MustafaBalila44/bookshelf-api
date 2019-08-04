"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
const bookSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});
exports.Book = mongoose_1.model("Book", bookSchema);
//# sourceMappingURL=book.model.js.map