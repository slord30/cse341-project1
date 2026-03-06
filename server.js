const express = require('express');
const mongodb = require('/data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes/userRoutes'));

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});