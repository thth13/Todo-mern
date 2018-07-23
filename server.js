const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const db = require('./config/keys').mongoURI;

const user = require('./routes/user');
const todo = require('./routes/todo');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/user', user);
app.use('/todo', todo);

app.listen(5000, () => console.log('Server started'));