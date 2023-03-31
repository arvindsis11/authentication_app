import axios from 'axios';

/** make api requests */

/** authentication function-- */

export async function authentication(username){
    try {
        return await axios.post("/api/authenticate",{username});
    } catch (error) {
        return {error:"username doesn't exists!"}
    }
}

/** get user details */

export async function getUser({username}){
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