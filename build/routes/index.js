"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const authors_1 = __importDefault(require("./authors"));
const books_1 = __importDefault(require("./books"));
const book_model_1 = require("../models/book.model");
const author_model_1 = require("../models/author.model");
author_model_1.Author.create({
    about: "English man, was born on an island in 1990",
    firstName: "Raimond",
    lastName: "Redington",
}).then((res) => {
    book_model_1.Book.insertMany([
        {
            author: res.id,
            name: "The Cartel",
            priceSdg: 200,
            priceXp: 150,
            description: "Good Book",
            note: "This book is nice",
            category: "Novel",
            pages: 200,
            image: "https://bookshelf5000.herokuapp.com/images/book.jpg",
        },
        {
            author: res.id,
            name: "The Cartel",
            priceSdg: 200,
            priceXp: 150,
            description: "Good Book",
            note: "This book is nice",
            category: "Novel",
            pages: 200,
            image: "https://bookshelf5000.herokuapp.com/images/book.jpg",
        },
        {
            author: res.id,
            name: "The Cartel",
            priceSdg: 200,
            priceXp: 150,
            description: "Good Book",
            note: "This book is nice",
            category: "Novel",
            pages: 200,
            image: "https://bookshelf5000.herokuapp.com/images/book.jpg",
        },
        {
            author: res.id,
            name: "The Cartel",
            priceSdg: 200,
            priceXp: 150,
            description: "Good Book",
            note: "This book is nice",
            category: "Novel",
            pages: 200,
            image: "https://bookshelf5000.herokuapp.com/images/book.jpg",
        },
        {
            author: res.id,
            name: "The Cartel",
            priceSdg: 200,
            priceXp: 150,
            description: "Good Book",
            note: "This book is nice",
            category: "Novel",
            pages: 200,
            image: "https://bookshelf5000.herokuapp.com/images/book.jpg",
        },
    ]).then(res => console.log(res));
});
const router = express_1.Router();
router.use('/users', users_1.default);
router.use('/authors', authors_1.default);
router.use('/books', books_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map