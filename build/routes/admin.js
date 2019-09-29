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
router.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(req.params.id)
        .populate("address");
    const d = new Date(user.dateOfBirth);
    if (user === null) {
        return res.render("404");
    }
    return res.render("users/view", { user, dateOfBirth: `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}` });
}));
router.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find({})
        .populate("category")
        .populate("author");
    return res.render("books/list", { books });
}));
router.post("/update_book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        delete req.body.image;
        const book = yield book_model_1.Book.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.redirect(`/admin/books/${req.params.id}`);
    }
    catch (_a) {
        return res.redirect("/admin/books");
    }
}));
router.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(req.params.id)
        .populate("category")
        .populate("author");
    const categories = yield category_1.Category.find({});
    const authors = yield author_model_1.Author.find({});
    if (book === null) {
        return res.render("404");
    }
    return res.render("books/view", { book, categories, authors });
}));
router.get("/add_book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = {};
    const categories = yield category_1.Category.find({});
    const authors = yield author_model_1.Author.find({});
    return res.render("books/add", { books, categories, authors });
}));
router.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_1.Category.find({});
    return res.render("books/list-categories", { categories });
}));
router.get("/categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.Category.findById(req.params.id);
    if (category === null) {
        return res.render("404");
    }
    return res.render("books/view-category", { category });
}));
router.get("/add_category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = {};
    return res.render("books/add-category", { category });
}));
router.post("/update_category/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.Category.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.redirect(`/admin/categories/${req.params.id}`);
    }
    catch (_b) {
        return res.redirect("/admin/categories");
    }
}));
router.get("/add_points/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(req.params.id);
    return res.render("users/add_points", { user });
}));
router.post("/add_points/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.updateOne({ _id: req.params.id }, { points: req.body.points }, { runValidators: true });
    return res.redirect(`/admin/add_points/${req.params.id}`);
}));
exports.default = router;
//# sourceMappingURL=admin.js.map