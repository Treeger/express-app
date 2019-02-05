import express from 'express';
import router from './routes/index';
import cookieParser from 'cookie-parser';
import cookieHandler from "./middlewares/cookieHandler";
import parsedQuery from "./middlewares/parsedQuery";

const app = express();

app.use(cookieParser());

app.use(parsedQuery);
app.use(cookieHandler);
app.use('/', router);


export default app
