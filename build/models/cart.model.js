"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
const cartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
        min: 0,
    },
    books: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Book',
    },
});
exports.Cart = mongoose_1.model("Cart", cartSchema);
//# sourceMappingURL=cart.model.js.map