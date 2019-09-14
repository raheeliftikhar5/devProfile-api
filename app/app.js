import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportVerification from './config/passport';
import userRoutes from './routes/user';

const app = express();

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: false})); // extended is false to use queryString instead of qs lib
// support parsing of application/json type post data
app.use(bodyParser.json());

// initialize passport authentication
app.use(passport.initialize());
// configure passport verification with jwt-strategy
passportVerification(passport);

app.get('/', (req, res) => {
  res.send('API is working');
});

// application routes
app.use('/user', userRoutes);

export default app;
