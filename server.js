const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const port = process.env.PORT;


connectDb();


app.use(bodyParser.json());




app.use('/api/contacts',require("./routes/contactRoutes"))
app.use('/api/users',require("./routes/UserRoutes"))
app.use(errorHandler)


app.listen(port,() => {
    console.log(`jihad started at ${port}`);
});
