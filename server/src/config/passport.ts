import passport from "passport";
import passportLocal from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { User } from "../models/user.model";
import { Error } from "mongoose";

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

const LocalStrategy = passportLocal.Strategy;

passport.use(new JWTStrategy(opts, (jwtPayload, done) => {
    User.findOne({ _id: jwtPayload.id })
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch((err) => done(err, false));

}));

passport.use(new LocalStrategy({
    passwordField: 'password',
    usernameField: 'email',
}, (email, password, done: Function) => {
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: "Wrong email" });
            }
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
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

passport.use("admin", new LocalStrategy({
    passwordField: 'password',
    usernameField: 'email',
}, (email, password, done: Function) => {
    console.log(email)
    User.findOne({ email, isAdmin: true })
        .then((user) => {
            console.log(user)
            if (!user) {
                return done(null, false, { message: "Wrong email" });
            }
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
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

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });