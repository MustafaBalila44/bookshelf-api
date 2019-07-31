import { Router } from "express";
import users from './users';
import authors from './authors';
import books from './books';

const router = Router();

router.use('/users', users);
router.use('/authors', authors);
router.use('/books', books);
export default router;
