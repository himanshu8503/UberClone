const dotenv = require("dotenv");
dotenv.config();
const express = require('express') ;
const cors = require('cors');
const ConnectDB = require('./db/db');
const UserRoute = require('./routes/user.routes')

ConnectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/",(req,res) => {
    res.send("Hello World")
});
app.use("/users",UserRoute);


module.exports = app;
