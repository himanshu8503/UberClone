const CaptainModel = require('../modles/captain.model');
const {validationResult} = require('express-validator');
const CaptainService = require('../services/captain.services');
const blacklistModel = require('../modles/blacklist.model');


module.exports.registerCaptain = async (req, res,next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()});
    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await CaptainModel.findOne({Email: email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'Captain with this email already exist'});
    }

    const hashpassword = await CaptainModel.hashPassword(password);

    const captain = await CaptainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashpassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicletype: vehicle.vehicletype
    });

    const token = captain.generateAuthToken();

    return res.status(201).json({token,captain});
}

module.exports.loginCaptain = async (req,res, next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()});
    }

    const {email,password} = req.body;

    const captain = await CaptainModel.findOne({Email: email}).select("+Password");

    if(!captain){
        return res.status(401).json({message: "Invalid Email or Password"});
    }


    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: "Invalid Email or Password"});
    }

    const token = captain.generateAuthToken();

    res.cookie('token',token);

    return res.status(200).json({token, captain});
}


module.exports.getCaptainProfile = async (req,res,next) => {
    const captain = req.captain;

    return res.status(200).json({captain});

}

module.exports.logoutCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    await blacklistModel.create({token});

    res.clearCookie('token');

    return res.status(200).json({message: "logout successfully"});
}
