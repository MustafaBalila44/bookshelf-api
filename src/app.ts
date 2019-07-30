import express from "express";
import morgan from 'morgan';
import { join } from "path";
import { createWriteStream } from 'fs';
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import compression from "compression";  // compresses requests
import cors from 'cors';
import helmet from "helmet";
import router from "./routes";
import passport from "passport";
import './config/passport';

const app = express();
const accessLogStream = createWriteStream(
  join(__dirname, 'access.log'), { flags: 'a' }
);

app.use(passport.initialize());
app.use(morgan('common', { stream: accessLogStream }));
app.use(compression());
app.use(cors());
// provide extra security features
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/static', express.static('static'));

app.use('/api', router);
export default app;
