import { Router } from 'express';
import passport from "passport";
import { UserController } from '../controllers/users';
import { emailPassword, cartValidators } from '../middlewares/validator';

const router = Router();

router.get('/orders', UserController.getOrder);

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
router.get('/', UserController.findAll);

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
router.post('/login', UserController.login);

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
router.post('/signup', emailPassword, UserController.signup);

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
router.get('/:id', UserController.findOne);

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
router.put('/:id', passport.authenticate('jwt', { session: false }),
    UserController.updateOne);

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
router.delete('/:id', passport.authenticate('jwt', { session: false }),
    UserController.deleteOne);

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
router.post('/add_to_cart', cartValidators,
    passport.authenticate('jwt', { session: false }), UserController.addToCart);

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
router.post('/remove_from_cart', cartValidators,
    passport.authenticate('jwt', { session: false }), UserController.removeFromCart);

/**
 * @api {get} /users/remove_from_cart
 * @apiGroup Users
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
router.get('/:id/cart',
    passport.authenticate('jwt', { session: false }), UserController.findCart);

// updates a user address
router.put('/update_address/:id',
    passport.authenticate('jwt', { session: false }), UserController.updateUserAddress);

// create a new order
router.post('/orders',
    passport.authenticate('jwt', { session: false }), UserController.createOrder);

router.put('/orders',
    passport.authenticate('jwt', { session: false }), UserController.updateOrder);

// get all orders     
router.get('/orders', UserController.getOrders);

// get orders of a user
router.get('/:id/orders',
    passport.authenticate('jwt', { session: false }), UserController.getOrdersByUser);
// get one order by it's id
router.get('/orders/:id',
    passport.authenticate('jwt', { session: false }), UserController.getOrder);

router.post('/cancel_order/:id',
    passport.authenticate('jwt', { session: false }), UserController.cancelOrder);

export default router;
