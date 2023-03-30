import jwt from "jsonwebtoken";
import ENV from '../config.js'

//for jwt token endpoint security

//auth middleware
export default async function Auth(req,res,next){
    try {
        //retrieve authorization header to validate request
        const token = req.headers.authorization.split(" ")[1];

        //retrieve the userdetails of the logged in user 
        const decodedToken = await jwt.verify(token,ENV.JWT_SECRET);

        req.user = decodedToken;
        // res.json(decodedToken);
        next();
    } catch (error) {
        res.status(401).json({error:"Authorization failed!"})
    }
}

/** middleware for local variables so other endpoints ,location can get access to it */

export function localVariables(req,res,next){
   //access variables using app.locals
    req.app.locals = {
        OTP:null,
        resetSession:false
    }
    next();
}