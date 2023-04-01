import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/** middleware for verify usesr */

export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == 'GET' ? req.query : req.body;
        // check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) {
            return res.status(404).send({ error: "Can't find username" });
        }
        next();
    } catch (error) {
        return res.status(404).send({ error: "authentication error" })
    }
}

/** POST: http://localhost:8080/api/register
  :{
 * "username":"arvindsis35",
 * "password":"arvind@123",
 * "email":"testing@gmail.com",
 * "fistname":"arvind",
 * "lastname":"sisodiya",
 * "mobile":383836337,
 * "address" : "139 , IT crystal ,usa",
 * "profile" : ""
 * }
*/
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // check the existing username
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username })
                .then(user => {
                    if (user) {
                        reject({ error: "Please use unique username" });
                    }
                    resolve();
                })
                .catch(err => {
                    reject({ error: "Please use unique email" });//--fix here
                });
        });

        // check the existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email })
                .then(email => {
                    if (email) {
                        reject({ error: "Please use unique email" });
                    }
                    resolve();
                })
                .catch(err => {
                    reject({ error: "Please use unique email" });
                });
        });
        //save details into db
        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            const user = new UserModel({
                                username: username,
                                password: hashedPassword,
                                profile: profile || '',
                                email: email,
                            });
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Registered successfully!" }))
                                .catch(error => res.status(500).send({ msg: "not registered" }))

                        }).catch(error => {
                            return res.status(500).send({
                                error: "unable to encrypt password"
                            });
                        })
                }
            }).catch(error => {
                console.log(error);
                res.status(400).send(error);

            })
    } catch (error) {
        return res.status(500).send({ msg: "server not responding" });
    }
}

/** POST: http://localhost:8080/api/login
 * 
 * @param {"username":"arvindsis35","password":"admin@123"} res 
 */
export async function login(req, res) {
    const { username, password } = req.body;
    try {
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) {
                            return res.status(400).send({ error: "don't have password" });//--fix-me
                        }
                        //create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "24h" });

                        return res.status(200).send({
                            msg: "Login successfull",
                            username: user.username,
                            token
                        })


                    })
                    .catch(error => {
                        return res.status(400).send({ error: "password does not match" });
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not found!" });
            })
    } catch (error) {
        return res.status(500).send(error);
    }
}

/** GET: http://localhost:8080/api/user/usernameexample
 * 
 */
export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(501).send({ error: "Invalid Username" });
        }
        UserModel.findOne({ username }).then(user => {
            if (!user) {
                return res.status(501).send({ error: "couldn't find the user" });
            }
            //mongoose returns mongo data so we need to convert--way 2: rest._doc return
            const { password, ...rest } = Object.assign({}, user.toJSON());//filtered the password
            return res.status(201).send(rest);//status 201
        })
            .catch(err => {
                return res.status(500).send(err);
            });
    } catch (error) {
        return res.status(404).send({ error: "Can't find user data" });
    }
}

/** 
 * PUT: http://localhost:8080/api/updateUser
 * @param;{
 * "header":"<token>"
 * }
 * body:{
 *  firstname: '',
 *  address : '',
 *  profile : ''
 * }
 */
export async function updateUser(req, res) {
    try {

        // const id = req.query.id;
        const { userId } = req.user;

        if (userId) {
            const body = req.body;
            //update the data
            UserModel.updateOne({ _id: userId }, body).then(user => {
                if (!user) return res.status(501).send({ error: "couldn't find user" });
                return res.status(201).send({ msg: "Record updated...!" })
            }).catch(error => {

                return res.status(401).send({ error: "User Not Found...!" });

            });
        } else {
            return res.status(401).send({ error: "User not found!" })
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}

/**GET: http://localhost:8080/api/genrateOTP */
export async function genrateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    res.status(201).send({ code: req.app.locals.OTP });
}

/**GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;//reset otp value
        req.app.locals.resetSession = true;// set the session for reset password
        return res.status(201).send({ msg: 'verified successfully!' });
    }
    return res.status(400).send({ error: 'Invalid OTP' });
}

// redirects user when the otp is valid
/**GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false; //allow access to this route only once
        return res.status(201).send({ msg: "access granted!" });
    }
    return res.status(440).send({ error: "Session expired!" });
}

// update the password when user have valid otp
/**PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    try {
        if(!req.app.locals.resetSession){
            return res.status(404).send({error: "Session Expired!"});
        }
        const { username, password } = req.body;
        try {
            UserModel.findOne({ username })
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username: user.username }, { password: hashedPassword })
                                .then(data => {
                                    req.app.locals.resetSession = false;//fix--me
                                    return res.status(201).send({ msg: "Password Updated!" });
                                })
                                .catch(error => {
                                    return res.status(500).send({ error });
                                })
                        })
                        .catch(error => {
                            return res.send(500).send({
                                error: "unable to hash(encrypt) password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error: "Username not found@!" });
                })
        } catch (error) {
            return res.status(500).send({ error });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}