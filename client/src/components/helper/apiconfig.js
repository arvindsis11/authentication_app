import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** make api requests */

/** authentication function-- */

export async function authenticate(username){
    try {
        return await axios.post("/api/authenticate",{username});
    } catch (error) {
        return {error:"username doesn't exists!"}
    }
}

/** get user details */

export async function getUser(username){//{username} --replace later
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return data;
    } catch (error) {
        return {error:"password doesn't match"}
    }
}

/** register user function */

export async function registerUser(credentials){
    try {
       const {data:{msg},status} =  await axios.post(`/api/register/`,credentials);
       let {username,email} = credentials;
       /** send mail if success */
       if(status === 201){
        await axios.post('/api/registerMail',{username,userEmail : email,text : msg});
       }
       return Promise.resolve(msg);
    } catch (error) {
        return Promise.reject({error});
    }
}

/** login user function */

export async function verifyPassword({username,password}){
 try {
    if(username){
       const {data} =  await axios.post('/api/login',{username,password});
       return Promise.resolve({data});
    }
    
 } catch (error) {
    return Promise.reject({error:"Password doesn't match!"});
 }
}

/** update user details function */

export async function updateUser(response){
    try {
       const token = await localStorage.getItem('token');
       const data = await axios.put('/api/updateUser',response,{ headers : { "Authorization" : `Bearer ${token}`}});
       return Promise.resolve({data}); 
    } catch (error) {
        return Promise.reject({error:"couldn't update profile"});
    }
}

/** generate otp */

export async function genrateOTP(username){

    try {
       const {data:{code},status} = await axios.get('/api/generateOTP',{params :{username}}); 
       // send mail with the otp
       if(status === 201){
         let {data :{email}} = await getUser({username});
         let text = `Your password Recovery OTP is ${code}. Verify and reset your password.`;
         await axios.post('/api/registerMail',{username,userEmail:email,text,subject:"Password Recovery OTP"});
       }
       return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error});
    }
}

/** verify OTP */

export async function verifyOTP({username,code}){
    try {
       const {data,status} = await axios.get('/api/verifyOTP',{params:{username,code}});
       return {data,status};
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({username,password}){
    try {
        const {data,status} = await axios.put('/api/resetPassword',{username,password});
        return Promise.resolve({data,status});
    } catch (error) {
        return Promise.reject({error});
    }
}

