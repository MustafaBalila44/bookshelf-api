import { Request, Response } from "express";
import { validationResult } from 'express-validator/check';
import _ from 'lodash';
import { Book } from '../models/book.model';
import { Category } from "../models/category";
export class BookController {

    /**
     * @description findAll gets all the books in the DB
     */
    public static findAll = async (req: Request, res: Response) => {
        const category = req.query.category;
        try {
            if (category) {
                const books = await Book.find({ category, isHidden: false });
                return res.json({ books });
            } else {
                const books = await Book.find({ isHidden: false });
                return res.json({ books });
            }
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description findOne gets a single book by its id
     */
    public static findOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const book = await Book.findOne({ _id: id })
                .populate("author", ["_id", "firstName", "lastName",], "Author");
            return res.json({ book });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description updateOne updates abook by its id
     */

    public static updateOne = async (req: Request, res: Response) => {
        const body = req.body;
        const updatedFields = _.pick(body, ['name', 'priceSdg', 'priceXp', 'hidden ' , 'image']);
        try {
            const doc = await Book.findByIdAndUpdate(req.params.id, updatedFields);
            return res.json({ message: "updated successfully", book: doc });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description deleteOne deletes a book by its id
     */
    public static deleteOne = async (req: Request, res: Response) => {
        try {
            const doc = await Book.findByIdAndDelete(req.params.id);
            return res.json({ message: "deleted successfully", book: doc });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description create Creates a new book and save to the DB
     */
    public static create = async (req: Request, res: Response) => {
        const fields = _.pick(req.body, [
            'name', 'note', 'status',
            'priceSdg', 'priceXp',
            'author', 'description',
            'category', 'pages',
        ]);
        try {
            // get the filename and create an image path
            const image = `/assets/images/${req.file.filename}`;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            const book = await Book.create({ ...fields, image });
            return res.status(201).json({ book });
        } catch (error) {
            return res.status(500).json({ error });
        }

    }

    public static createCategory = async (req: Request, res: Response) => {
        const fields = _.pick(req.body, ['name']);

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            const category = await Category.create(fields);
            return res.status(201).json({ category });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public static findCategories = async (req: Request, res: Response) => {
        try {
            const categories = await Category.find();
            return res.json({ categories });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}
