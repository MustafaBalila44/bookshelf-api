"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const book_model_1 = require("../models/book.model");
const author_model_1 = require("../models/author.model");
const category_1 = require("../models/category");
const order_model_1 = require("../models/order.model");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
const isAdmin = (req, res, next) => {
    if (req.url === "/login") {
        return next();
    }
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.redirect("/admin/login");
};
router.use(isAdmin);
router.get("/login", (req, res) => {
    return res.render("login");
});
router.post("/login", passport_1.default.authenticate("admin", { successRedirect: "/admin", failureRedirect: "/admin/login" }));
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const usersCount = yield user_model_1.User.find().count();
    const booksCount = yield book_model_1.Book.find({ isHidden: false }).count();
    const onGoingOrdersCount = yield order_model_1.Order.find({ status: "going" }).count();
    const onProcessingOrdersCount = yield order_model_1.Order.find({ status: "processing" }).count();
    const onFinishedOrdersCount = yield order_model_1.Order.find({ status: "finished" }).count();
    return res.render("admin", {
        usersCount, onGoingOrdersCount,
        onProcessingOrdersCount, onFinishedOrdersCount,
        booksCount,
        user: req.user
    });
}));
// books routes
router.get("/books", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const books = yield book_model_1.Book.find({})
        .populate("category")
        .populate("author");
    return res.render("books/list", { books, user: req.user });
}));
router.post("/update_book/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        delete req.body.image;
        const book = yield book_model_1.Book.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.redirect(`/admin/books/${req.params.id}`);
    }
    catch (_a) {
        return res.redirect("/admin/books");
    }
}));
router.get("/books/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(req.params.id)
        .populate("category")
        .populate("author");
    const categories = yield category_1.Category.find({});
    const authors = yield author_model_1.Author.find({});
    if (book === null) {
        return res.render("500", { user: req.user });
    }
    return res.render("books/view", { book, categories, authors });
}));
router.get("/add_book", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const books = {};
    const categories = yield category_1.Category.find({});
    const authors = yield author_model_1.Author.find({});
    return res.render("books/add", { books, categories, authors, user: req.user });
}));
// categories routes
router.get("/categories", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const categories = yield category_1.Category.find({});
    return res.render("books/list-categories", { categories, user: req.user });
}));
router.get("/categories/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const category = yield category_1.Category.findById(req.params.id);
    if (category === null) {
        return res.render("500", { user: req.user });
    }
    return res.render("books/view-category", { category, user: req.user });
}));
router.get("/add_category", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const category = {};
    return res.render("books/add-category", { category, user: req.user });
}));
router.post("/update_category/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const category = yield category_1.Category.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.redirect(`/admin/categories/${req.params.id}`);
    }
    catch (_b) {
        return res.redirect("/admin/categories");
    }
}));
// users routes
router.get("/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    return res.render("users/list", { users, user: req.user });
}));
router.get("/users/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(req.params.id)
        .populate("address");
    if (user === null) {
        return res.render("500", { user: req.user });
    }
    return res.render("users/view", { app_user: user, user: req.user });
}));
router.get("/add_points/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(req.params.id);
    return res.render("users/add_points", { app_user: user, user: req.user });
}));
router.post("/add_points/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_model_1.User.updateOne({ _id: req.params.id }, { points: req.body.points }, { runValidators: true });
    return res.redirect(`/admin/add_points/${req.params.id}`);
}));
// orders routes
router.get("/orders/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    /// order status and type from the query string
    const { status, type } = req.query;
    //
    try {
        // if status was supplied
        if (status === "cancelled") {
            const orders = yield order_model_1.Order.find({ cancelled: true })
                .populate("user");
            return res.render("orders/list", { orders, query: req.query, user: req.user });
        }
        else if (status) {
            const orders = yield order_model_1.Order.find({ status, type, cancelled: false })
                .populate("user");
            return res.render("orders/list", { orders, query: req.query, user: req.user });
        }
        else {
            const orders = yield order_model_1.Order.find({ type })
                .populate("user");
            ;
            return res.render("orders/list", { orders, query: req.query, user: req.user });
        }
    }
    catch (error) {
        return res.render("500", { error, user: req.user });
    }
}));
router.get("/orders/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield order_model_1.Order.findById(id).populate("user");
        return res.render("orders/view", { order, user: req.user });
    }
    catch (error) {
        return res.render("500", { error, user: req.user });
    }
}));
router.post("/orders/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield order_model_1.Order.updateOne({ _id: id }, { status: req.body.status }, { runValidators: true });
        return res.redirect(`/admin/orders/${id}`);
    }
    catch (error) {
        console.error(error);
        return res.render("500", { error, user: req.user });
    }
}));
exports.default = router;
//# sourceMappingURL=admin.js.map