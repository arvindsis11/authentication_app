import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from './helper/validate';
import { useAuthStore } from '../store/store';
// import useFetch from '../hooks/fetch.hook';
import './style.css';
import { verifyPassword } from './helper/apiconfig';
// import styles from './styles/Username.module.css';
/**another way to use styles */
export default function Username() {

  const navigate = useNavigate();//fix here
  const setUsername = useAuthStore(state => state.setUsername);
  // const { username } = useAuthStore(state => state.auth);
  // const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      // console.log(values)
      setUsername(values.username);
      // navigate('/password'); --fix
      let loginPromise = verifyPassword({ username: values.username, password: values.password });
      // console.log(values);
      toast.promise(loginPromise, {
        loading: "please wait...",
        success: <b>Login Successful...!</b>,
        error: <b>Password Not Match</b>
      })

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  
  // if (serverError) {
  //   return <div>Error: {serverError.message}</div>;
  // }
  return (
    <>
      <section className="vh-100" style={{ "backgroundColor": "#508bfc" }}>
        <div className="container py-5 h-100">
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ "borderRadius": "1rem" }}>
                <div className="card-body p-5 text-center">
                  {/* <h3 className={styles.test}>testing</h3> */}
                  <h3 className="mb-5">Sign in</h3>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('username')} type="username" id="username" className="form-control form-control-lg" placeholder='username' />
                    </div>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('password')} type="password" id="password-2" className="form-control form-control-lg" placeholder='password' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  <hr className="my-4" />
                  <div className="text-center">
                    <small>forgot password? <Link to="/recovery" className="text-danger">recover</Link></small>
                  </div>
                  <div className="text-center">
                    <small>Not a member? <Link to="/register" className="text-danger">register here</Link></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
