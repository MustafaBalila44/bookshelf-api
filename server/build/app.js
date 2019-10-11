"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = require("./routes");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("./config/passport");
const app = express_1.default();
const Store = connect_mongo_1.default(express_session_1.default);
app.use(express_session_1.default({ secret: process.env.SESSION_KEY, store: new Store({ url: process.env.DB_URI, autoReconnect: true, ttl: 60 * 60 }) }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(morgan_1.default("common"));
app.use(compression_1.default());
app.use(cors_1.default({ preflightContinue: true }));
// provide extra security features
app.use(helmet_1.default());
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.set("view engine", "ejs");
app.use("/", express_1.default.static("public"));
app.use("/static", express_1.default.static("static"));
app.use("/admin", routes_1.admin);
app.use("/api", routes_1.router);
exports.default = app;
//# sourceMappingURL=app.js.map