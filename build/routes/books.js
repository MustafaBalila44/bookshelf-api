"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const multer_1 = require("../config/multer");
const books_1 = require("../controllers/books");
const router = express_1.Router();
/**
 * @api {get} /books List all books
 * @apiGroup Books
 * @apiSuccess {Object[]} books list
 * @apiSuccess {String} books._id Books _id
 * @apiSuccess {String} book.name book's name
 * @apiSuccess {Number} book.priceSdg book priceSdg
 * @apiSuccess {Number} book.priceXp book priceXp
 * @apiSuccess {UUID} book.author book author
 * @apiSampleRequest http://localhost:8000/api/books/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "_id": 564643,
 *      "name": "The Cartel",
 *      "priceSdg": 120,
 *      "priceXp": 520,
 *      "author": "45678076453tvd8"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', books_1.BookController.findAll);
/**
 * @api {post} /books/create creates a new author
 * @apiGroup Books
 * @apiParam {String} priceSdg Book priceSdg
 * @apiParam {String} priceXp Book priceXp
 * @apiSuccess {String} book._id book's id
 * @apiSuccess {String} book.priceSdg book's priceSdg
 * @apiSuccess {String} book.priceXp book's priceXp
 * @apiSuccess {UUID} author book's author
 * @apiParamExample {json} Input
 *      {
 *      "_id": 564643,
 *      "name": "The Cartel",
 *      "priceSdg": 120,
 *      "priceXp": 520,
 *      "author": "45678076453tvd8"
 *      }
 * @apiSampleRequest http://localhost:8000/api/books/create
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *      {
 *      "_id": 564643,
 *      "name": "The Cartel",
 *      "priceSdg": 120,
 *      "priceXp": 520,
 *      "author": "45678076453tvd8"
 *      }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/create', multer_1.upload.single("image"), books_1.BookController.create);
/**
 * @api {get} /books/:id Get a single book
 * @apiGroup Books
 * @apiParam {id} id Book's _id
 * @apiSuccess {String} book._id Author's _id
 * @apiSuccess {String} book.priceSdg book's priceSdg
 * @apiSuccess {String} book.priceXp book's priceXp
 * @apiSuccess {String} book.name book's name
 * @apiSuccess {Object} book.book book's author
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *      {
 *      "_id": 564643,
 *      "name": "The Cartel",
 *      "priceSdg": 120,
 *      "priceXp": 520,
 *      "author": {
 *                   "id": "3598564339h90khv",
 *                   "firstName": "Raymond",
 *                   "lastName": "Redington",
 *              }
 *      }
 * @apiSampleRequest http://localhost:8000/api/books/:id
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', books_1.BookController.findOne);
/**
 * @api {put} /books/:id updates a single book
 * @apiGroup Books
 * @apiParam {id} id Book's _id
 * @apiSuccess {String} book._id Author's _id
 * @apiSuccess {String} book.priceSdg book's priceSdg
 * @apiSuccess {String} book.priceXp book's priceXp
 * @apiSuccess {String} book.name book's name
 * @apiSuccess {Object} book.book book's author
 * @apiParamExample {json} Input
 *     {
 *      "name": "The Mombasa Cartel",
 *     }
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *      {
 *      "_id": 564643,
 *      "name": "The Mombasa Cartel",
 *      "priceSdg": 120,
 *      "priceXp": 520,
 *      "author": {
 *                   "id": "3598564339h90khv",
 *                   "firstName": "Raymond",
 *                   "lastName": "Redington",
 *              }
 *      }
 * @apiSampleRequest http://localhost:8000/api/books/:id
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', passport_1.default.authenticate('jwt', { session: false }), books_1.BookController.updateOne);
/**
 * @api {delete} /books/:id Delets a single book
 * @apiGroup Books
 * @apiParam {id} id Book's _id
 * @apiSuccess {String} book._id Author's _id
 * @apiSuccess {String} book.priceSdg book's priceSdg
 * @apiSuccess {String} book.priceXp book's priceXp
 * @apiSuccess {String} book.name book's name
 * @apiSuccess {Object} book.book book's author
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *      {
 *      "_id": 564643,
 *      "name": "The Cartel",
 *      "priceSdg": 120,
 *      "priceXp": 520,
 *      "author": {
 *                   "id": "3598564339h90khv",
 *                   "firstName": "Raymond",
 *                   "lastName": "Redington",
 *              }
 *      }
 * @apiSampleRequest http://localhost:8000/api/books/:id
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), books_1.BookController.deleteOne);
// add a new category
router.post('/categories', books_1.BookController.createCategory);
// list all the categories
router.get('/categories', books_1.BookController.findCategories);
exports.default = router;
//# sourceMappingURL=books.js.map