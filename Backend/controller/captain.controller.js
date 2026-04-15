const CaptainModel = require('../modles/captain.model');
const {validationResult} = require('express-validator');
const CaptainService = require('../services/captain.services');


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

