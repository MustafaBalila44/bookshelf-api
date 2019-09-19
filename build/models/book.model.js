"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
const bookSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
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
        default: "https://bookshelf5000.herokuapp.com/images/book.jpg",
        required: true,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
});
exports.Book = mongoose_1.model("Book", bookSchema);
//# sourceMappingURL=book.model.js.map