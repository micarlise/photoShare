
const express = require('express');

const photoRouter = require('./routes/photos');

let app = express();

app.use('/', photoRouter);

app.listen(3000);
