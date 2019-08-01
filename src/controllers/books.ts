import { Request, Response } from "express";
import { validationResult } from 'express-validator/check';
import _ from 'lodash';
import { Book } from '../models/book.model';
export class BookController {

    /**
     * @description findAll gets all the books in the DB
     */
    public static findAll = async (req: Request, res: Response) => {
        try {
            const books = await Book.find({});
            return res.json({ books });
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
            const book = await Book.findOne({ _id: id });
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
        const updatedFields = _.pick(body, ['name', 'priceSdg', 'priceXp',]);
        try {
            const doc = await Book.findByIdAndUpdate(req.params.id, updatedFields);
            return res.json({ message: "updated successfuly", book: doc });
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
            return res.json({ message: "deleted successfuly", book: doc });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description create Creates a new book and save to the DB
     */
    public static create = async (req: Request, res: Response) => {
        const  fields = _.pick(req.body, ['name', 'priceSdg', 'priceXp', 'author']);
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const book = await Book.create(fields);
        return res.status(201).json({ book });
    } catch (error) {
        return res.status(500).json({ error });
    }

    }
}