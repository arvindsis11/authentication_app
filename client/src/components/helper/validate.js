import { toast } from "react-hot-toast";
/**valadate userrname */

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
}

export async function passwordValidate(values){
    const errors = passwordVerify({},values);

    return errors;
}

 function passwordVerify(error={},values){
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
    if(!values.password){
        error.password = toast.error("password is required");
    } else if(values.password.includes(' ')){
        error.password = toast.error("wrong pass is required");
    }else if(values.password.length<4){
        error.password = toast.error("more then 4");
    }else if(!specialChars.test(values.password)){
        error.password = toast.error("it should contain a special char..");
    }
    return error;
 }

function usernameVerify(error = {}, values) {
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
    if (!values.username) {
        error.username = toast.error('Username required...!');
    } else if (values.username.includes(' ')) {
        error.username = toast.error('Username Invalid...!');
    } else if (values.password.length<4) {
        error.password = toast.error('password length...!');
    }
    else if (!specialChars.test(values.password)) {
        error.password = toast.error("it should contain a special char..");
    }

    return error;
}

// function usernamePasswordVerify(error = {},values){
//     if(!values.username){
//         error.username = toast.error('username Required...!');
//     }else if(!values.password){
//         error.password = toast.error('password required...!');
//     }
//     else if(values.password.length<4){
//         error.username = toast.error('password must be more then 4 chars');
//     }
//     else if(values.username.includes("")){
//         error.username = toast.error('Invalid username');
//     }
//     return error;
// }

/**validate reset password */

export async function resetPasswordValidation(values){
    const errors = passwordVerify({},values);
    if(values.password!==values.confirm_pwd){
        errors.exists = toast.error('Password not match...!');
    }
    return errors;
}