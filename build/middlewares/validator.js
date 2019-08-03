"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
exports.emailPassword = [
    check_1.check('password').isString(),
    check_1.check('email').isEmail(),
    check_1.check('password').isLength({ min: 8 }),
];
exports.authorValidtors = [
    check_1.check('firstName').isString(),
    check_1.check('firstName').isLength({ min: 5 }),
    check_1.check('lastName').isString(),
    check_1.check('lastName').isLength({ min: 5 }),
];
exports.bookValidators = [
    check_1.check('name').isString(),
    check_1.check('name').isLength({ min: 5 }),
    check_1.check('priceSdg').isNumeric(),
    check_1.check('priceXp').isNumeric(),
];
exports.cartValidators = [
    check_1.check('bookId').isString(),
    check_1.check('bookId').isLength({ min: 5 }),
];
//# sourceMappingURL=validator.js.map