const captainModel = require('../modles/captain.model');


module.exports.createCaptain = async ({firstname, lastname, email, password, color, plate, capacity, vehicletype}) => {


    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicletype) {
        throw new Error('All fields are required');
    }

    const Captain = await captainModel.create({
        Fullname: {
            firstname,
            lastname
        },
        Email: email,
        Password: password,
        Vehicle:{
            color,
            plate,
            capacity,
            vehicletype
        }
    });

    return Captain;

}
