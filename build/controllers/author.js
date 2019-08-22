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
const author_model_1 = require("../models/author.model");
class AuthorController {
}
/**
 * @description findAll gets all the authors in the DB
 */
AuthorController.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const authors = yield author_model_1.Author.find({});
        return res.json({ authors });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description findOne gets a single author by its id
 */
AuthorController.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const author = yield author_model_1.Author.findOne({ _id: id });
        return res.json({ author });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description updateOne updates an author by its id
 */
AuthorController.updateOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    const updatedFields = lodash_1.default.pick(body, ['firstName', 'lastName', 'about',]);
    try {
        const doc = yield author_model_1.Author.findByIdAndUpdate(req.params.id, updatedFields);
        return res.json({ message: "updated successfuly", author: doc });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description deleteOne deletes an author by its id
 */
AuthorController.deleteOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const doc = yield author_model_1.Author.findByIdAndDelete(req.params.id);
        return res.json({ message: "deleted successfuly", author: doc });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description create Creates a new author and save to the DB
 */
AuthorController.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const fields = lodash_1.default.pick(req.body, ['firstName', 'lastName', 'about',]);
    try {
        const errors = check_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        console.log(req.body);
        const author = yield author_model_1.Author.create(fields);
        return res.status(201).json({ author });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.AuthorController = AuthorController;
//# sourceMappingURL=author.js.map