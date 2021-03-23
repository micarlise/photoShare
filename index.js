
const express = require('express');
const morgan = require('morgan');

const photoRouter = require('./routes/photos');
const userRouter = require('./routes/users');
const followRouter = require('./routes/followers');

let logger = morgan('short');

let app = express();

app.use(logger);
app.use('/photos', photoRouter);
app.use('/users', userRouter);
app.use('/followers', followRouter);

app.listen(3000);
