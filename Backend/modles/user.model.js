const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    Fullname: {
        firstName : {
            type: String,
            required: true,
            minlength: [3, "First Name must be at least 3 character long"]
        },

        lastName : {
            type: String,
            minlength: [3, "Last Name must be at least 3 character long"]
        }
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Last Name must be at least 5 character long"]
    },

    Password: {
        type: String,
        required: true,
        select: false
    },

    SocketID: {
        type: String,
    }
});


UserSchema.method.genrateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

UserSchema.method.comparePassword = function(password){
    return bcrypt.compare(password,this.Password);
}

UserSchema.static.hashPassword = function(password){
    return bcrypt.hash(password,10);
}

const UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;