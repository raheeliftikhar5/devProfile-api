import mongoose from 'mongoose';
import app from './app';

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('Mongodb is connected'))
  .catch(error => console.log(error));

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server is running on port ${port}`)});