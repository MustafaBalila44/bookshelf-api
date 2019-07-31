"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const users_1 = require("../controllers/users");
const validator_1 = require("../middlewares/validator");
const router = express_1.Router();
/**
 * @api {get} /users List all users
 * @apiGroup Users
 * @apiSuccess {Object[]} users list
 * @apiSuccess {String} user._id User id
 * @apiSuccess {String} user.username Username
 * @apiSuccess {Number} user.score User's score
 * @apiSampleRequest http://localhost:8000/api/users/
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "_id": 564643,
 *      "username": "Tom",
 *      "score": 150
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', users_1.UserController.findAll);
/**
 * @api {post} /users/login Authenicates a user
 * @apiGroup Users
 * @apiSuccess {String} user._id User id
 * @apiSuccess {String} user.username Username
 * @apiSuccess {Number} user.score User's score
 * @apiSuccess {String} token authentication token
 * @apiParamExample {json} Input
 *     {
 *      "username": "Tom",
 *      "password": "*******"
 *     }
 * @apiSampleRequest http://localhost:8000/api/users/login
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      "user": {
 *      "_id": 564643,
 *      "username": "Tom",
 *      "score": 150
 *      },
 *      "token": "fdggjhhyruufderr47itred.fdggjhhyruufderr47itred.fdggjhhyruufderr47itred="
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', users_1.UserController.login);
/**
 * @api {post} /users/signup creates a new user
 * @apiGroup Users
 * @apiParam {String} username User username
 * @apiParam {String} password User password
 * @apiSuccess {String} user._id User id
 * @apiSuccess {String} user.username Username
 * @apiSuccess {Number} user.score User's score
 * @apiSuccess {String} token authentication token
 * @apiParamExample {json} Input
 *     {
 *      "username": "Tom",
 *      "password": "*******"
 *     }
 * @apiSampleRequest http://localhost:8000/api/users/signup
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      "user": {
 *      "_id": 564643,
 *      "username": "Tom",
 *      "score": 150
 *      },
 *      "token": "fdggjhhyruufderr47itred.fdggjhhyruufderr47itred.fdggjhhyruufderr47itred="
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/signup', validator_1.usernamePassword, users_1.UserController.signup);
/**
 * @api {get} /users/:id Get a single user
 * @apiGroup Users
 * @apiParam {id} id User _id
 * @apiSuccess {String} user._id User id
 * @apiSuccess {String} user.username Username
 * @apiSuccess {Number} user.score User's score
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *    {
 *      "_id": 564643,
 *      "username": "Tom",
 *      "score": 150
 *    }
 * @apiSampleRequest http://localhost:8000/api/users/:id
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', users_1.UserController.findOne);
/**
 * @api {put} /users/id updates an authenticated user
 * @apiGroup Users
 * @apiParam {String} id User _id
 * @apiParamExample {json} Input
 *    {
 *      "_id": "3598564339h90khv",
 *    }
 * @apiSuccess {String} _id User _id
 * @apiSuccess {String} username User username
 * @apiSuccess {Number} score User score
 * @apiSampleRequest http://localhost:8000/api/users/:id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": 1,
 *      "Username": "Tom",
 *      "score": 200,
 *    }
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', passport_1.default.authenticate('jwt', { session: false }), users_1.UserController.updateOne);
/**
 * @api {delete} /users/id deletes an authenticated user
 * @apiGroup Users
 * @apiParam {String} id User _id
 * @apiSuccess {String} _id User _id
 * @apiSuccess {String} username User username
 * @apiSuccess {Number} score User score
 * @apiSampleRequest http://localhost:8000/api/users/:id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": 1,
 *      "Username": "Tom",
 *      "score": 200,
 *    }
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), users_1.UserController.deleteOne);
/**
 * @api {post} /users/add_to_cart adds a book to a user cart
 * @apiGroup Users
 * @apiParam {String} id bookId _id
 * @apiSuccess {String} message
 * @apiParamExample {json} Input
 *     {
 *      "bookId": "33736328e8e7e7",
 *     }
 * @apiSampleRequest http://localhost:8000/api/users/:id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "message": "Book was added successfuly"
 *    }
 * @apiErrorExample {json} Authentication error
 *   HTTP/1.1 403 Forbidden
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/add_to_cart', validator_1.cartValidators, passport_1.default.authenticate('jwt', { session: false }), users_1.UserController.addToCart);
/**
 * @api {post} /users/remove_from_cart removes a book to a user cart
 * @apiGroup Users
 * @apiParam {String} id bookId _id
 * @apiSuccess {String} message
 * @apiParamExample {json} Input
 *     {
 *      "bookId": "33736328e8e7e7",
 *     }
 * @apiSampleRequest http://localhost:8000/api/users/:id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "message": "Book was removed successfuly"
 *    }
 * @apiErrorExample {json} Authentication error
 *   HTTP/1.1 403 Forbidden
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/remove_from_cart', validator_1.cartValidators, passport_1.default.authenticate('jwt', { session: false }), users_1.UserController.removeFromCart);
/**
 * @api {get} /users/:id/cart Get an authenticated user cart
 * @apiGroup Users
 * @apiParam {id} id User _id
 * @apiSuccess {UUId} cart._id cart _id
 * @apiSuccess {Object[]} cart.books Cart's books
 * @apiSuccess {Number} price Cart's price
 * @apiSuccess {UUID} user Cart's user _id
 * @apiSuccessExample {json} Success
 *   HTTP/1.1 200 OK
 *    {
 *      "_id": 564643,
 *      "books":  [],
 *      "price": 150,
 *      "user": "44rfghgg75erf89643"
 *    }
 * @apiSampleRequest http://localhost:8000/api/users/:id/cart
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id/cart', passport_1.default.authenticate('jwt', { session: false }), users_1.UserController.findCart);
exports.default = router;
//# sourceMappingURL=users.js.map