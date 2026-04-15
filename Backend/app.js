const dotenv = require("dotenv");
dotenv.config();
const express = require('express') ;
const cors = require('cors');
const ConnectDB = require('./db/db');
const cookieParser = require('cookie-parser');
const UserRoute = require('./routes/user.routes');
const CaptainRoute = require('./routes/captain.routes');

ConnectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("Hello World")
});
app.use("/users",UserRoute);
app.use('/captains',CaptainRoute);


module.exports = app;
