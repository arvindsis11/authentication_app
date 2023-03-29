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
router.route('/user/:username').get();//get user with username
router.route('/generateOTP').get();//generate random otp
router.route('/verifyOTP').get();//verify otp
router.route('/createResetSession').get();//reset all the variables
/** PUT Methods */
router.route('/updateUser').put();//to update the userprofile
router.route('/resetPassword').put();// use to reset password
/** DELETE Methods */

export default router;