import { check } from "express-validator/check";

export const emailPassword = [
    check('email').isString(),
    check('password').isString(),
    check('username').isEmail(),
    check('username').isLength({ min: 5, max: 30 }),
    check('password').isLength({ min: 8 }),
];

export const authorValidtors = [
    check('firstName').isString(),
    check('firstName').isLength({ min: 5}),
    check('lastName').isString(),
    check('lastName').isLength({ min: 5 }),
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
