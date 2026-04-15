const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const CaprainSchema = new mongoose.Schema({
    Fullname:{
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long']
        },
        lastname:{
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long']
        }
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },

    Password: {
        type: String,
        required: true,
        select: false,
    },

    SocketID: {
        type: String,
    },

    Status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    Vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long']
        },

        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long']
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },

        vehicletype: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },

    location: {
        lat: {
            type: Number,
        },
        lng:{
            type: Number,
        }
    }

});



CaprainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

CaprainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.Password);
}

CaprainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}



const CaptainModel = mongoose.model('captains', CaprainSchema);

module.exports = CaptainModel;

