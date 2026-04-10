const mongoose = require("mongoose");


function connectDB()
{
    mongoose.connect(process.env.DB_URL)
    .then(console.log("DB is Connected "))
    .catch((err) => console.log(`ERROR WHILE CONNECTED DB : ${err}`));
}

module.exports = connectDB;