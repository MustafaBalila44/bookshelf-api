"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = require("passport-jwt");
const user_model_1 = require("../models/user.model");
const opts = {};
opts.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
    user_model_1.User.findOne({ _id: jwtPayload.id })
        .then((user) => {
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    })
        .catch((err) => done(err, false));
}));
passport_1.default.use(new LocalStrategy({
    passwordField: 'password',
    usernameField: 'email',
}, (email, password, done) => {
    user_model_1.User.findOne({ email })
        .then((user) => {
        if (!user) {
            return done(null, false, { message: "Wrong email" });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err.message, false, { err });
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, { message: "Wrong password" });
        });
    })
        .catch((err) => done(err));
}));
passport_1.default.use("admin", new LocalStrategy({
    passwordField: 'password',
    usernameField: 'email',
}, (email, password, done) => {
    user_model_1.User.findOne({ email, isAdmin: true })
        .then((user) => {
        if (!user) {
            return done(null, false, { message: "Wrong email" });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err.message, false, { err });
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, { message: "Wrong password" });
        });
    })
        .catch((err) => done(err));
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
//# sourceMappingURL=passport.js.map