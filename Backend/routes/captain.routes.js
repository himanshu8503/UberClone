const express = require('express');
const {body} = require('express-validator');
const CaptainController = require('../controller/captain.controller');

const CaptainRouter = express.Router();

CaptainRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('Firstname must be at least 3 character long'),
    body('password').isLength({min: 6}).withMessage('Firstname must be at least 6 character long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 character long'),
    body('vehicle.plate').isLength({min:3}).withMessage('PlateNo. must be at least 3 character long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicletype').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle Type')
], CaptainController.registerCaptain);



module.exports = CaptainRouter;