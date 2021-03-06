const { routes } = require('./routes');
const express = require('express');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const app = express();
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT);
console.log(`Server is running on port ${process.env.PORT}`);
