import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';

const app = express();

// bodyparser middleware
app.use(bodyParser.urlencoded({extended: false})); // extended is false to use queryString instead of qs lib
app.use(bodyParser.json());

// application routes
app.use('/users', userRoutes);

export default app;
