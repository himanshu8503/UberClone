const UserModel = require('../modles/user.model');
const UserService = require('../services/user.services')
const {validationResult} = require('express-validator');
const BlacklistModel = require('../modles/blacklist.model');


module.exports.registerUser = async (req, res, next) => {

    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({ERRORS : error.array()});
    }

    const { fullname , email, password} = req.body;

    const hashPassword = await UserModel.hashPassword(password);

    const user = await UserService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashPassword
    });

    const token = await user.genrateAuthToken();

    return res.status(201).json({user ,token});

}

module.exports.loginUser = async (req,res,next) => {

    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({ERRORS : error.array()});
    }

    const {email,password} = req.body;

    const user = await UserModel.findOne({Email: email}).select("+Password");

    if(!user){
        return res.status(401).json({message: "Invalid Email or Password"});
    }

    const isMatch = user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: "Invalid Email or Password"});
    }

    const token = await user.genrateAuthToken();

    res.cookie('token', token);

    return res.status(200).json({user, token});
}

module.exports.getUserProfile = async (req,res,next) =>{

    return res.status(200).json({user: req.user});

}

module.exports.logoutUser = async (req,res,next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await BlacklistModel.create({token});

    res.clearCookie('token');

    return res.status(200).json({message: "Logged out successfully"});
}