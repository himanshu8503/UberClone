const express = require('express');
const {body} = require('express-validator');
const UserController = require('../controller/user.controller');
const AuthMiddlewre = require('../middleware/auth.middleware');

const UserRouter = express.Router();

UserRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage("Firstname should be at least 3 character long"),
    body('password').isLength({min:6}).withMessage("Password should be at least 6 character long"),
],
UserController.registerUser);

UserRouter.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage("Password should be at least 6 character long")
],
UserController.loginUser);

UserRouter.get('/profile',AuthMiddlewre.authUser ,UserController.getUserProfile);

module.exports = UserRouter;