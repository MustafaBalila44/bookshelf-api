import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";
import { Author } from "../models/author.model";
import { Category } from "../models/category";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.render("admin");
});

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


router.get("/add_points/:id", async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    return res.render("users/add_points", { user });
});

router.post("/add_points/:id", async (req: Request, res: Response) => {
    const user = await User.updateOne({ _id: req.params.id }, { points: req.body.points }, { runValidators: true });
    return res.redirect(`/admin/add_points/${req.params.id}`);
});

export default router;
 