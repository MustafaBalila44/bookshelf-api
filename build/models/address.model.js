"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
const addressSchema = new mongoose_1.Schema({
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
exports.Address = mongoose_1.model("Address", addressSchema);
//# sourceMappingURL=address.model.js.map