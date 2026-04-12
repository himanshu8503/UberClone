const UserModel = require('../modles/user.model');


module.exports.createUser = async ({firstname,lastname,email,password}) => {

    if( !firstname || !email || !password ){
        throw new Error("All field is required");
    }

    const user = await UserModel.create({
        Fullname: {
            firstName: firstname,
            lastName: lastname
        },
        Email : email,
        Password : password
    })

    return user;
}

