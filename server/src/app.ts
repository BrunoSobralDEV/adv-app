import express, { Express, urlencoded, json } from 'express';
import cors from 'cors';
import index from './routes/index';
import processRoute from './routes/process.routes'

const app: Express = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use(processRoute);

export default app;