import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";  // compresses requests
import cors from "cors";
import helmet from "helmet";
import { router, admin } from "./routes";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./config/passport";

const app = express();

const Store = MongoStore(session);
const appSession = session({ secret: process.env.SESSION_KEY, 
    store: new Store({ url: process.env.DB_URI, autoReconnect: true, ttl: 60 * 60 }),
});

app.use(appSession);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("common"));
app.use(compression());
app.use(cors({ preflightContinue: true }));
// provide extra security features
app.use(helmet());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use("/", express.static("public"));
app.use("/static", express.static("static"));
app.use("/admin", admin);

app.use("/api", router);
export default app;
