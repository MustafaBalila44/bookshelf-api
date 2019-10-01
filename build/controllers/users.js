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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const check_1 = require("express-validator/check");
const lodash_1 = __importDefault(require("lodash"));
const user_model_1 = require("../models/user.model");
const cart_model_1 = require("../models/cart.model");
const address_model_1 = require("../models/address.model");
const order_model_1 = require("../models/order.model");
const book_model_1 = require("../models/book.model");
class UserController {
}
/**
 * @section CRUD operations
 */
/**
 * @description findAll gets all the users in the DB
 */
UserController.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find({}, { password: 0 });
        return res.json({ users });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description findOne gets a single user by its id
 */
UserController.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_model_1.User.findOne({ _id: id }, { password: 0, })
            .populate({ path: 'cart', select: '_id, books' })
            .populate('address');
        return res.json({ user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description updateOne updates an authenticated user by its id
 * the id is not required in this function but it's used only for
 * code consistency
 */
UserController.updateOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    const updatedFields = lodash_1.default.pick(body, ['phone', 'points',]);
    try {
        const user = yield user_model_1.User.updateOne({ _id: req.user.id }, { phone: updatedFields.phone }, { runValidators: true });
        return res.json({ message: "updated successfully", user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
UserController.updateUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    const id = req.params.id;
    const updatedFields = lodash_1.default.pick(body, ['street', 'neighborhood', 'state', 'locality']);
    /*
    if (req.user.address !== id) {
        return res.status(401).json("Unauthorized");
    }
    */
    try {
        const address = yield address_model_1.Address.
            findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });
        return res.json({ message: "updated successfully", address });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description deleteOne deletes an authenticated user by its id
 * the id is not required in this function but it's used only for
 * code consistency
 */
UserController.deleteOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.sendStatus(403);
    }
    try {
        const doc = yield user_model_1.User.findByIdAndDelete(user.id);
        return res.json({ message: "deleted successfully", user: doc });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @section Authentication
 */
/**
 * @description login authenticate an existing user and generates a jwt
 */
UserController.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    passport_1.default.authenticate('local', { session: false }, (err, user, info) => __awaiter(this, void 0, void 0, function* () {
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
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
        return res.json({ user, token });
    }))(req, res, next);
});
/**
 * @description signup Creates a new user and save to the DB
 */
UserController.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const fields = lodash_1.default.pick(req.body, [
        'email', 'password', 'firstName', 'lastName',
        'phone', 'dateOfBirth',
    ]);
    const addressFields = lodash_1.default.pick(req.body, ['street', 'neighborhood', 'state', 'locality']);
    addressFields.locality = req.body.locallity;
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const existedUser = yield user_model_1.User.findOne({
            email: fields.email,
        });
        if (existedUser) {
            return res.json(400)
                .json({ message: "This email is already in use" });
        }
        const address = yield address_model_1.Address.create(addressFields);
        const user = yield user_model_1.User.create(Object.assign({ address: address.id }, fields));
        return res.json({ message: "Account was created" }).status(201);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @section Cart
 */
UserController.findCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = req.user;
    try {
        const cart = yield cart_model_1.Cart.findOne({ user: user.id })
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
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
UserController.addToCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const bookId = req.body.bookId;
    const user = req.user;
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!user) {
        return res.sendStatus(403);
    }
    try {
        const cart = yield cart_model_1.Cart.findOne({ user: user.id });
        cart.books.push(bookId);
        yield cart.save();
        return res.json({ message: "Book was added successfuly" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
UserController.removeFromCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const bookId = req.body.bookId;
    const user = req.user;
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!user) {
        return res.sendStatus(403);
    }
    try {
        const cart = yield cart_model_1.Cart.findOne({ user: user.id });
        cart.books.pull(bookId);
        yield cart.save();
        return res.json({ message: "Book was removed successfuly" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
UserController.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const fields = lodash_1.default.pick(req.body, ["type", "note", "totalPrice", "priceSDG", "priceXP", "booksCount"]);
    const user = req.user;
    const cart = yield cart_model_1.Cart.findOne({ user: user.id });
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    yield book_model_1.Book.updateMany({ _id: { $in: cart.books } }, { isHidden: true });
    try {
        const order = yield order_model_1.Order.create(Object.assign({}, fields, { user: user.id, books: cart.books }));
        yield order.save();
        return res.json({ message: "Order was created successfully", order, user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
// get the order
UserController.getOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
    /// order status and type from the query string
    const { status, type } = req.query;
    try {
        // if status was supplied
        if (status) {
            const orders = yield order_model_1.Order.find({ status, type });
            return res.json({ orders });
        }
        else {
            const orders = yield order_model_1.Order.find({ type });
            return res.json({ orders });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
// get the orders of a user
UserController.getOrdersByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    /// order status and type from the query string
    const { status, type } = req.query;
    const user = req.user;
    try {
        // if status was supplied
        if (status) {
            const orders = yield order_model_1.Order.find({ user: user.id, status, type });
            return res.json({ orders });
        }
        else {
            const orders = yield order_model_1.Order.find({ user: user.id, type });
            return res.json({ orders });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
UserController.getOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    try {
        const order = yield order_model_1.Order.findById(id)
            .populate({ path: "books", model: "Book" });
        return res.json({ order, user });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
UserController.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.body.status;
    try {
        const order = yield order_model_1.Order.updateOne({ id }, { status });
        return res.json({ order });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
UserController.cancelOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield order_model_1.Order.updateOne({ _id: id }, { cancelled: true });
        yield book_model_1.Book.updateMany({ _id: { $in: order.books } }, { isHidden: false });
        return res.json({ order });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.UserController = UserController;
//# sourceMappingURL=users.js.map