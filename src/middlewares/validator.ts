import { check } from "express-validator/check";

export const emailPassword = [
    check('password').isString(),
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
];

export const authorValidtors = [
    check('firstName').isString().isLength({ min: 2}),
    check('lastName').isString().isLength({ min: 2 }),
];

export const bookValidators = [
    check('name').isString(),
    check('name').isLength({ min: 5 }),
    check('priceSdg').isNumeric(),
    check('priceXp').isNumeric(),
];

export const cartValidators = [
    check('bookId').isString(),
    check('bookId').isLength({ min: 5 }),
];
