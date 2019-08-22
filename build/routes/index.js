"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const authors_1 = __importDefault(require("./authors"));
const books_1 = __importDefault(require("./books"));
const router = express_1.Router();
router.use('/users', users_1.default);
router.use('/authors', authors_1.default);
router.use('/books', books_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map