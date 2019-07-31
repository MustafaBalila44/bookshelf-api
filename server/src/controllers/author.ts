import { Request, Response } from "express";
import { validationResult } from 'express-validator/check';
import _ from 'lodash';
import { Author } from '../models/author.model';

export class AuthorController {

    /**
     * @description findAll gets all the authors in the DB
     */
    public static findAll = async (req: Request, res: Response) => {
        try {
            const authors = await Author.find({});
            return res.json({ authors });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description findOne gets a single author by its id
     */
    public static findOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const author = await Author.findOne({ _id: id });
            return res.json({ author });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description updateOne updates an author by its id
     */

    public static updateOne = async (req: Request, res: Response) => {
        const body = req.body;
        const updatedFields = _.pick(body, ['firstName', 'lastName', 'about',]);
        try {
            const doc = await Author.findByIdAndUpdate(req.params.id, updatedFields);
            return res.json({ message: "updated successfuly", author: doc });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description deleteOne deletes an author by its id
     */
    public static deleteOne = async (req: Request, res: Response) => {
        try {
            const doc = await Author.findByIdAndDelete(req.params.id);
            return res.json({ message: "deleted successfuly", author: doc });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description create Creates a new author and save to the DB
     */
    public static create = async (req: Request, res: Response) => {
        const  fields = _.pick(req.body, ['firstName', 'lastName', 'about',]);
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const author = await Author.create(fields);
        return res.status(201).json({ author });
    } catch (error) {
        return res.status(500).json({ error });
    }

    }
}