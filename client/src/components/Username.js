import React from 'react';
import { Link } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { usernameValidate } from './helper/validate';
import './style.css';

export default function Username() {

  const formik = useFormik({
    initialValues:{
      username:'',
      password:''
    },
    validate : usernameValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit : async values =>{
      console.log(values)
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
                  <h3 className="mb-5">Sign in</h3>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('username')} type="username" id="typeEmailX-2" className="form-control form-control-lg" placeholder='username' />
                    </div>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('password')} type="password" id="typeEmailX-2" className="form-control form-control-lg" placeholder='password' />
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
