import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";
import { Author } from "../models/author.model";
import { Category } from "../models/category";
import { Order } from "../models/order.model";
import passport from "passport";
import { upload } from "../config/multer";

const router = Router();

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.url === "/login") {
        return next();
    }
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.redirect("/admin/login");
}

router.use(isAdmin)

router.get("/login", (req: Request, res: Response) => {
    return res.render("login");
});

router.post("/login", passport.authenticate("admin", { successRedirect: "/admin", failureRedirect: "/admin/login" }));

router.get("/", async (req: Request, res: Response) => {
    const usersCount = await User.find().count();
    const booksCount = await Book.find({ isHidden: false }).count();
    const onGoingOrdersCount = await Order.find({ status: "going" }).count();
    const onProcessingOrdersCount = await Order.find({ status: "processing" }).count();
    const onFinishedOrdersCount = await Order.find({ status: "finished" }).count();

    return res.render("admin", {
        usersCount, onGoingOrdersCount,
        onProcessingOrdersCount, onFinishedOrdersCount,
        booksCount,
        user: req.user
    });
});

// books routes
router.get("/books", async (req: Request, res: Response) => {
    const books = await Book.find({})
        .populate("category")
        .populate("author");

    return res.render("books/list", { books, user: req.user });
});

router.post("/update_book/:id", upload.any(),async (req: Request, res: Response) => {
    try {
        console.log(Object.keys(req.files));return;
        if (req.files !== []) {
            const image = `/assets/images/${req.file}`;
            const book = await Book.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
        }
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
        return res.render("500", { user: req.user });
    }
    return res.render("books/view", { book, categories, authors });
});

router.get("/add_book", async (req: Request, res: Response) => {
    const books = {};
    const categories = await Category.find({});
    const authors = await Author.find({});
    return res.render("books/add", { books, categories, authors, user: req.user });
});

// categories routes
router.get("/categories", async (req: Request, res: Response) => {
    const categories = await Category.find({});
    return res.render("books/list-categories", { categories, user: req.user });
});

router.get("/categories/:id", async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);
    if (category === null) {
        return res.render("500", { user: req.user });
    }
    return res.render("books/view-category", { category, user: req.user });
});

router.get("/add_category", async (req: Request, res: Response) => {
    const category = {};
    return res.render("books/add-category", { category, user: req.user });
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
    return res.render("users/list", { users, user: req.user });
});

router.get("/users/:id", async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id)
        .populate("address");
    if (user === null) {
        return res.render("500", { user: req.user });
    }
    return res.render("users/view", { app_user: user, user: req.user });
});

router.get("/add_points/:id", async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    return res.render("users/add_points", { app_user: user, user: req.user });
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
        if (status === "cancelled") {
            const orders = await Order.find({ cancelled: true })
                .populate("user");
            return res.render("orders/list", { orders, query: req.query, user: req.user });
        } else if (status) {
            const orders = await Order.find({ status, type, cancelled: false })
                .populate("user");
            return res.render("orders/list", { orders, query: req.query, user: req.user });
        } else {
            const orders = await Order.find({ type })
                .populate("user");;
            return res.render("orders/list", { orders, query: req.query, user: req.user });
        }
    } catch (error) {
        return res.render("500", { error, user: req.user });
    }
});

router.get("/orders/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id).populate("user");
        return res.render("orders/view", { order, user: req.user });

    } catch (error) {
        return res.render("500", { error, user: req.user });
    }
});

router.post("/orders/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const order = await Order.updateOne({ _id: id }, { status: req.body.status }, { runValidators: true });
        return res.redirect(`/admin/orders/${id}`);

    } catch (error) {
        console.error(error);
        return res.render("500", { error, user: req.user });
    }
});

export default router;
