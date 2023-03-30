import { Router } from "express";
const router = Router();

/** import all the endpoint controllers */

import * as controller from '../controllers/appController.js'

/** POST Methods */
router.route('/register').post(controller.register);
router.route('/registerMail').post((req,res)=> res.end());//send mail --fix comment it
router.route('/authenticate').post((req,res)=> res.end());// authentication
router.route('/login').post(controller.login);// login
/** GET Methods */
router.route('/user/:username').get(controller.getUser);//get user with username
router.route('/generateOTP').get(controller.genrateOTP);//generate random otp
router.route('/verifyOTP').get(controller.verifyOTP);//verify otp
router.route('/createResetSession').get(controller.createResetSession);//reset all the variables
/** PUT Methods */
router.route('/updateUser').put(controller.updateUser);//to update the userprofile
router.route('/resetPassword').put(controller.resetPassword);// use to reset password
/** DELETE Methods */

export default router;