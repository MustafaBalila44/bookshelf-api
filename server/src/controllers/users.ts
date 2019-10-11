import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { validationResult } from 'express-validator/check';
import _ from 'lodash';
import { User } from '../models/user.model';
import { Cart } from "../models/cart.model";
import { Address } from "../models/address.model";
import { Order } from "../models/order.model";
import { Book } from "../models/book.model";
export class UserController {

    /**
     * @section CRUD operations
     */

    /**
     * @description findAll gets all the users in the DB
     */
    public static findAll = async (req: Request, res: Response) => {
        try {
            const users = await User.find({}, { password: 0 });
            return res.json({ users });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description findOne gets a single user by its id
     */
    public static findOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const user = await User.findOne({ _id: id }, { password: 0, })
                .populate({ path: 'cart', select: '_id, books' })
                .populate('address');
            return res.json({ user });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description updateOne updates an authenticated user by its id
     * the id is not required in this function but it's used only for
     * code consistency
     */

    public static updateOne = async (req: Request, res: Response) => {
        const body = req.body;
        const updatedFields = _.pick(body, ['phone', 'points']);

        try {
            const user = await User.updateOne({ _id: req.user.id }, updatedFields, { runValidators: true });
            return res.json({ message: "updated successfully", user });

        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public static updateUserAddress = async (req: Request, res: Response) => {
        const body = req.body;
        const id = req.params.id;
        const updatedFields = _.pick(body, ['street', 'neighborhood', 'state', 'locality']);
        /*
        if (req.user.address !== id) {
            return res.status(401).json("Unauthorized");
        }
        */
        try {
            const address = await Address.
                findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });
            return res.json({ message: "updated successfully", address });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description deleteOne deletes an authenticated user by its id
     * the id is not required in this function but it's used only for
     * code consistency
     */
    public static deleteOne = async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            return res.sendStatus(403);
        }
        try {
            const doc = await User.findByIdAndDelete(user.id);
            return res.json({ message: "deleted successfully", user: doc });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @section Authentication
     */

    /**
     * @description login authenticate an existing user and generates a jwt
     */
    public static login = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local',
            { session: false }, async (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.json({ info });
                }

                const payload = {
                    cart: user.cart,
                    email: user.email,
                    id: user.id,
                };
                const token = jwt.sign(payload, process.env.JWT_KEY);
                return res.json({ user, token });
            })(req, res, next);

    }

    /**
     * @description signup Creates a new user and save to the DB
     */
    public static signup = async (req: Request, res: Response) => {
        const fields = _.pick(req.body, [
            'email', 'password', 'firstName', 'lastName',
            'phone', 'dateOfBirth',
        ]);
        const addressFields = _.pick(req.body,
            ['street', 'neighborhood', 'state', 'locality']);
        addressFields.locality = req.body.locality;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        try {
            const existedUser = await User.findOne({
                email: fields.email,
            });
            if (existedUser) {
                return res.json(400)
                    .json({ message: "This email is already in use" });
            }
            const address = await Address.create(addressFields);
            const user = await User.create({ address: address.id, ...fields });
            return res.json({ message: "Account was created" }).status(201);
        } catch (error) {
            return res.status(500).json({ error });
        }

    }

    /**
     * @section Cart
     */


    public static findCart = async (req: Request, res: Response) => {
        const user = req.user;
        try {
            const cart = await Cart.findOne({ user: user.id })
                .populate({
                    path: 'books', select: ['_id', 'name', 'priceSdg', 'priceXp', 'author', 'image'], model: 'Book',
                    populate: {
                        path: 'author',
                        select: ['_id', 'firstName', 'lastName'],
                    },
                });
            // 'books',
            // ['_id', 'name', 'priceSdg', 'priceXp', 'author'],
            // 'Book'
            return res.json({ cart });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public static addToCart = async (req: Request, res: Response) => {
        const bookId = req.body.bookId;
        const user = req.user;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!user) {
            return res.sendStatus(403);
        }
        try {
            const cart = await Cart.findOne({ user: user.id });
            cart.books.push(bookId);
            await cart.save();
            return res.json({ message: "Book was added successfuly" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public static removeFromCart = async (req: Request, res: Response) => {
        const bookId = req.body.bookId;
        const user = req.user;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!user) {
            return res.sendStatus(403);
        }
        try {
            const cart = await Cart.findOne({ user: user.id });
            cart.books.pull(bookId);
            await cart.save();
            return res.json({ message: "Book was removed successfuly" });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public static createOrder = async (req: Request, res: Response) => {
        const fields = _.pick(req.body, ["type", "note", "totalPrice", "priceSDG", "priceXP", "booksCount"]);
        const user = req.user;
        const cart = await Cart.findOne({ user: user.id });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // if user doesn't have enough points 
        if (fields.priceXP > user.points) {
            return res.json({ message: "You don't have enough points" });
        }

        await Book.updateMany({ _id: { $in: cart.books } }, { isHidden: true });

        try {
            const order = await Order.create({ ...fields, user: user.id, books: cart.books });
            await User.updateOne(
                { _id: req.user.id },
                {
                    $inc: { points: -fields.priceXP, },
                    $push: { orders: order._id }
                });
            await order.save();
            return res.json({ message: "Order was created successfully", order, user });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    // get the order
    public static getOrders = async (req: Request, res: Response) => {
        /// order status and type from the query string
        const { status, type } = req.query;

        try {
            // if status was supplied
            if (status) {
                const orders = await Order.find({ status, type, cancelled: false });
                return res.json({ orders });
            } else {
                const orders = await Order.find({ type });
                return res.json({ orders });
            }
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    // get the orders of a user
    public static getOrdersByUser = async (req: Request, res: Response) => {
        /// order status and type from the query string
        const { status, type } = req.query;
        const user = req.user;

        try {
            // if status was supplied
            if (status) {
                const orders = await Order.find({ user: user.id, status, type, cancelled: false });
                return res.json({ orders });
            } else {
                const orders = await Order.find({ user: user.id , type });
                return res.json({ orders });
            }
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public static getOrder = async (req: Request, res: Response) => {
        const id = req.params.id;
        const user = req.user;

        try {
            const order = await Order.findById(id)
                .populate({ path: "books", model: "Book" });
            return res.json({ order, user });

        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public static updateOrder = async (req: Request, res: Response) => {
        const id = req.params.id;
        const status = req.body.status;
        try {
            const order = await Order.updateOne({ id }, { status });
            return res.json({ order });

        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    public static cancelOrder = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            await Order.updateOne({ _id: id }, { cancelled: true });
            const order = await Order.findById(id);
            await User.updateOne({ _id: req.user.id }, { $inc: { points: order.priceXP } });
            await Book.updateMany({ _id: { $in: order.books } }, { isHidden: false });
            return res.json({ message: "Order was cancelled" });

        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}
