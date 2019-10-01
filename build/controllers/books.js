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
const check_1 = require("express-validator/check");
const lodash_1 = __importDefault(require("lodash"));
const book_model_1 = require("../models/book.model");
const category_1 = require("../models/category");
class BookController {
}
/**
 * @description findAll gets all the books in the DB
 */
BookController.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const category = req.query.category;
    try {
        if (category) {
            const books = yield book_model_1.Book.find({ category });
            return res.json({ books });
        }
        else {
            const books = yield book_model_1.Book.find({});
            return res.json({ books });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description findOne gets a single book by its id
 */
BookController.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const book = yield book_model_1.Book.findOne({ _id: id });
        return res.json({ book });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description updateOne updates abook by its id
 */
BookController.updateOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    const updatedFields = lodash_1.default.pick(body, ['name', 'priceSdg', 'priceXp', 'hidden ', 'image']);
    try {
        const doc = yield book_model_1.Book.findByIdAndUpdate(req.params.id, updatedFields);
        return res.json({ message: "updated successfully", book: doc });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description deleteOne deletes a book by its id
 */
BookController.deleteOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const doc = yield book_model_1.Book.findByIdAndDelete(req.params.id);
        return res.json({ message: "deleted successfully", book: doc });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description create Creates a new book and save to the DB
 */
BookController.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const fields = lodash_1.default.pick(req.body, [
        'name', 'note', 'status',
        'priceSdg', 'priceXp',
        'author', 'description',
        'category', 'pages',
    ]);
    try {
        // get the file name and remove the st
        const image = req.file.filename;
        const errors = check_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const book = yield book_model_1.Book.create(Object.assign({}, fields, { image }));
        return res.status(201).json({ book });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
BookController.createCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const fields = lodash_1.default.pick(req.body, ['name']);
    try {
        const errors = check_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const category = yield category_1.Category.create(fields);
        return res.status(201).json({ category });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
BookController.findCategories = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.find();
        return res.json({ categories });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.BookController = BookController;
//# sourceMappingURL=books.js.map