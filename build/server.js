#!/usr/bin/node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV || "__DEV__";
mongoose_1.default.connect(process.env.DB_URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("Connected to the databaes"))
    .catch((err) => {
    console.error(`Can not connect to the database ${err}`);
    process.exit(1);
});
app_1.default.listen(port, () => {
    console.log(`
\t\t\tListining on port ${port}
\t\t\tENV: ${ENV}
\t\t\tDate: ${new Date()}
`);
});
//# sourceMappingURL=server.js.map