import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { userRecoveryValidate } from './helper/validate';
import { useAuthStore } from '../store/store';

export default function UserVerify() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : 'example123'
    },
    validate : userRecoveryValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/recovery')
    }
  })
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
                  <h3 className="mb-5">Enter username</h3>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('username')} type="username" id="username" className="form-control form-control-lg" placeholder='username' />
                    </div>
                    <button type="submit" className="btn btn-primary">Next</button>
                  </form>
                  <hr className="my-4" />
                  <div className="text-center">
                    <small>Already registered? <Link to="/" className="text-danger">Login</Link></small>
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
