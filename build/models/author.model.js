"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
const authorSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minlength: 5,
        required: true,
        match: /[a-zA-Z0-9_]/,
    },
    lastName: {
        type: String,
        min: 5,
        required: true,
        match: /[a-zA-Z0-9_]/,
    },
    books: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Book',
        default: [],
    },
    about: {
        type: String,
        required: true,
    },
});
exports.Author = mongoose_1.model("Author", authorSchema);
//# sourceMappingURL=author.model.js.map