"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = require("path");
const fs_1 = require("fs");
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const passport_1 = __importDefault(require("passport"));
require("./config/passport");
const app = express_1.default();
const accessLogStream = fs_1.createWriteStream(path_1.join(__dirname, 'access.log'), { flags: 'a' });
app.use(passport_1.default.initialize());
app.use(morgan_1.default('common', { stream: accessLogStream }));
app.use(compression_1.default());
app.use(cors_1.default({ preflightContinue: true }));
// provide extra security features
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/', express_1.default.static('static'));
app.use('/api', routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map