import express from 'express';
import passport from 'passport'
import router from './routes/index';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieHandler from "./middlewares/cookieHandler";
import parsedQuery from "./middlewares/parsedQuery";
import {passportJWTStrategy} from "./middlewares/passport"

const app = express();


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

passport.use('passportJWTStrategy', passportJWTStrategy);


app.use(parsedQuery);
app.use(cookieHandler);
app.use('/', router);

export default app
