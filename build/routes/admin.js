"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const book_model_1 = require("../models/book.model");
const author_model_1 = require("../models/author.model");
const category_1 = require("../models/category");
const router = express_1.Router();
router.get("/", (req, res) => {
    return res.render("admin");
});
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    return res.render("users/list", { users });
}));
router.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find({})
        .populate("author");
    return res.render("books/list", { books });
}));
router.get("/add_book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = {};
    const categories = yield category_1.Category.find({});
    const authors = yield author_model_1.Author.find({});
    return res.render("books/add", { books, categories, authors });
}));
exports.default = router;
//# sourceMappingURL=admin.js.map