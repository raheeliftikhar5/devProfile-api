const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./app/routes/user');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));  // extended is false to use queryString instead of qs
app.use(bodyParser.json());

const db = require('./app/config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('Mongodb is connected'))
  .catch(error => console.log(error));

// application routes
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server is running on port ${port}`)});