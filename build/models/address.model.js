"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
const addressSchema = new mongoose_1.Schema({
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
exports.Address = mongoose_1.model("Address", addressSchema);
//# sourceMappingURL=address.model.js.map