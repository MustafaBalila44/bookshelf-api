import express from "express";
import morgan from "morgan";
import { join } from "path";
import { createWriteStream } from "fs";
import bodyParser from "body-parser";
import compression from "compression";  // compresses requests
import cors from "cors";
import helmet from "helmet";
import { router, admin } from "./routes";
import passport from "passport";
import "./config/passport";

const app = express();

app.use(passport.initialize());
app.use(morgan("common"));
app.use(compression());
app.use(cors({ preflightContinue: true }));
app.set("view engine", "ejs");
// provide extra security features
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("static"));
app.use("/admin", admin);

app.use("/api", router);
export default app;
