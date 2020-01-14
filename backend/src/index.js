const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://alexmongodb:ale1989@cluster0-06ql9.mongodb.net/find-dev-js-app?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);
