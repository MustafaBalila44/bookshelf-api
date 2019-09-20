import { Router, Request, Response} from "express";
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

router.get("/books", async (req: Request, res: Response) => {
    const books = await Book.find({})
        .populate("author");
    return res.render("books/list", { books });
});

router.get("/add_book", async (req: Request, res: Response) => {
    const books = {};
    const categories = await Category.find({});
    const authors = await Author.find({});
    return res.render("books/add", { books, categories, authors });
});

export default router;
 