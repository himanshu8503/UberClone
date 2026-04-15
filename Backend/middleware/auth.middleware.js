const UserModel = require('../modles/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../modles/blacklist.model');
const CaptainModel = require('../modles/captain.model');

module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    const isBlacklisted = await blacklistModel.findOne({token});

    if(isBlacklisted){
        return res.status(401).json({message: "Unauthorized"});
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);

        req.user = user;
        
        return next();

    } catch (err) {
        return res.status(401).json({message: "Unauthorized" , ERROR : err.message});
    }

}


module.exports.authCaptain = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: "unauthorized"});
    }

    const isBlacklisted = await blacklistModel.findOne({token});

    if(isBlacklisted){
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await CaptainModel.findById(decoded._id);

        req.captain = captain;

        return next();

    } catch (error) {
        return res.status(401).json({message: "Unauthorized", ERROR: error.message});
    }
}


