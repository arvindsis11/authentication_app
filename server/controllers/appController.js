import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

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
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
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
                            return res.status(400).send({ error: "don't have password" });
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
    res.json('getUser route');
}

/** 
 * PUT: http://localhost:8080/api/updateUser
 * @param;{
 * "id":"<userid>"
 * }
 * body:{
 *  firstname: '',
 *  address : '',
 *  profile : ''
 * }
 */
export async function updateUser(req, res) {
    res.json('updateUser route');
}

/**GET: http://localhost:8080/api/genrateOTP */
export async function genrateOTP(req, res) {
    res.json('otp generate route');
}

/**GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
    res.json('verifyOTP route');
}

// redirects user when the otp is valid
/**GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
    res.json('createResetSession route');
}

// update the password when user have valid otp
/**PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    res.json('resetPassword route');
}