import { Router } from "express";
const router = Router();

/** import all the endpoint controllers */

import * as controller from '../controllers/appController.js'
import {registerMail} from '../controllers/mailer.js';
/** import the middleware */
import Auth, { localVariables } from "../middleware/authentication.js";


/** POST Methods */
router.route('/register').post(controller.register);//register user
router.route('/registerMail').post(registerMail);//send mail --fix comment it
router.route('/authenticate').post((req, res) => res.end());// authentication
router.route('/login').post(controller.verifyUser, controller.login);// login
/** GET Methods */
router.route('/user/:username').get(controller.getUser);//get user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.genrateOTP);//generate random otp
router.route('/verifyOTP').get(controller.verifyOTP);//verify otp --fix-me use> controller.verifyUser
router.route('/createResetSession').get(controller.createResetSession);//reset all the variables
/** PUT Methods */
router.route('/updateUser').put(Auth, controller.updateUser);//to update the userprofile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);// use to reset password
/** DELETE Methods */

export default router;