import express from 'express';
import morgan from "morgan";
import cors from "cors";
import routes from './routes/Index.routes';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1.5mb' }));


app.use("/", routes);

export default app;
