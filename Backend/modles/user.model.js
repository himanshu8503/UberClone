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


UserSchema.methods.genrateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET);
    return token;
}

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.Password);
}

UserSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;