


/** POST: http://localhost:8080/api/register
 * @param :{
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
export async function register(req,res){
    res.json('register route');
}

/** POST: http://localhost:8080/api/login
 * 
 * @param {"username":"arvindsis35","password":"admin@123"} res 
 */
export async function login(req,res){
    res.json('login route');
}

/** GET: http://localhost:8080/api/user/usernameexample
 * 
 */
export async function getUser(req,res){
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
export async function updateUser(req,res){
    res.json('updateUser route');
}

/**GET: http://localhost:8080/api/genrateOTP */
export async function genrateOTP(req,res){
    res.json('otp generate route');
}

/**GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    res.json('verifyOTP route');
}

// redirects user when the otp is valid
/**GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
    res.json('createResetSession route');
}

// update the password when user have valid otp
/**PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){
    res.json('resetPassword route');
}