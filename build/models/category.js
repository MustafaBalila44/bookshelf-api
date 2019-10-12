"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable: object-literal-sort-keys
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        minlength: 1,
        required: true,
        index: true,
    },
});
exports.Category = mongoose_1.model("Category", categorySchema);
//# sourceMappingURL=category.js.map