"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
const authorSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minlength: 2,
        required: true,
    },
    lastName: {
        type: String,
        min: 2,
        required: true,
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