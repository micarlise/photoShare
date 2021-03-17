
const express = require('express');
const morgan = require('morgan');

const photoRouter = require('./routes/photos');

let logger = morgan('short');

let app = express();

app.use(logger);
app.use('/', photoRouter);

app.listen(3000);
