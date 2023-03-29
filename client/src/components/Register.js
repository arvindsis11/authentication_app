import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from './helper/validate';
import userpic from './assets/userpic.jpg';
import convertToBase64 from './helper/convert';
import './style.css';

export default function Register() {


  const [file,setFile] = useState()

  const formik = useFormik({
    initialValues: {
      username: 'arvindsis35',
      email: 'abc@gmail.com',
      password: 'password@123'
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values,{ profile : file || ''})
      console.log(values)
    }
  })
  /**formik not supports file upload so we will create a function */
  const onUpload = async e =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <>
      <section className="vh-50" style={{ "backgroundColor": "#508bfc" }}>
        <div className="container py-2 h-50">
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ "borderRadius": "1rem" }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-3">Sign Up</h3>
                  <small className='text-muted'>explore here fix!</small>
                  <div>
                    <label htmlFor="profile">
                      <img src={file || userpic} className="mx-auto d-block" alt="John" style={{ width: "30%", borderRadius: "50%" }} />
                    </label>
                    <input onChange={onUpload} type="file" name="profile" id="profile" />
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                  <div className="form-group my-4">
                      <input {...formik.getFieldProps('email')} type="text" id="emailId" className="form-control form-control-lg" placeholder='Email*' />
                    </div>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('username')} type="text" id="username-2" className="form-control form-control-lg" placeholder='username*' />
                    </div>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('password')} type="text" id="password-2" className="form-control form-control-lg" placeholder='password*' />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                  </form>
                  <hr className="my-2" />
                  <div className="text-center">
                    <small>Already registered? <Link to="/" className="text-danger">login here</Link></small>
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
