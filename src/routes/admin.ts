import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";
import { Author } from "../models/author.model";
import { Category } from "../models/category";
import { Order } from "../models/order.model";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.render("admin");
});

// books routes
router.get("/books", async (req: Request, res: Response) => {
    const books = await Book.find({})
        .populate("category")
        .populate("author");

    return res.render("books/list", { books });
});

router.post("/update_book/:id", async (req: Request, res: Response) => {
    try {
        delete req.body.image;
        const book = await Book.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.redirect(`/admin/books/${req.params.id}`);
    } catch {
        return res.redirect("/admin/books");
    }
});

router.get("/books/:id", async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id)
        .populate("category")
        .populate("author");
    const categories = await Category.find({});
    const authors = await Author.find({});
    if (book === null) {
        return res.render("404");
    }
    return res.render("books/view", { book, categories, authors });
});

router.get("/add_book", async (req: Request, res: Response) => {
    const books = {};
    const categories = await Category.find({});
    const authors = await Author.find({});
    return res.render("books/add", { books, categories, authors });
});

// categories routes
router.get("/categories", async (req: Request, res: Response) => {
    const categories = await Category.find({});
    return res.render("books/list-categories", { categories });
});

router.get("/categories/:id", async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);
    if (category === null) {
        return res.render("404");
    }
    return res.render("books/view-category", { category });
});

router.get("/add_category", async (req: Request, res: Response) => {
    const category = {};
    return res.render("books/add-category", { category });
});

router.post("/update_category/:id", async (req: Request, res: Response) => {
    try {
        const category = await Category.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        return res.redirect(`/admin/categories/${req.params.id}`);
    } catch {
        return res.redirect("/admin/categories");
    }
});

// users routes
router.get("/users", async (req: Request, res: Response) => {
    const users = await User.find({});
    return res.render("users/list", { users });
});

router.get("/users/:id", async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)
        .populate("address");
    const d = new Date(user.dateOfBirth);
    if (user === null) {
        return res.render("404");
    }
    return res.render("users/view", { user, dateOfBirth: `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}` });
});

router.get("/add_points/:id", async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    return res.render("users/add_points", { user });
});

router.post("/add_points/:id", async (req: Request, res: Response) => {
    const user = await User.updateOne({ _id: req.params.id }, { points: req.body.points }, { runValidators: true });
    return res.redirect(`/admin/add_points/${req.params.id}`);
});

// orders routes

router.get("/orders/", async (req: Request, res: Response) => {
    /// order status and type from the query string
    const { status, type } = req.query;
//
    try {
        // if status was supplied
        if (status) {
            const orders = await Order.find({ status, type })
                .populate("user");
            return res.render("orders/list", { orders, query: req.query });
        } else {
            const orders = await Order.find({ type })
                .populate("user");;
            return res.render("orders/list", { orders, query: req.query });
        }
    } catch (error) {
        return res.render("errors/500", { error });
    }
});

router.get("/orders/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id).populate("user");
        return res.render("orders/view", { order });

    } catch (error) {
        return res.render("errors/500", { error });
    }
});

router.post("/orders/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const order = await Order.updateOne({ _id: id }, { status: req.body.status }, { runValidators: true });
        return res.redirect(`/admin/orders/${id}`);

    } catch (error) {
        console.error(error);
        return res.render("errors/500", { error });
    }
});

export default router;
