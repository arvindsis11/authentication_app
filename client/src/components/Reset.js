import React from 'react';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { resetPasswordValidation } from './helper/validate';
import './style.css';

export default function Reset() {

  const formik = useFormik({
    initialValues:{
      password:'',
      confirm_pwd:''
    },
    validate : resetPasswordValidation,
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
                  <h3 className="mb-5">Reset</h3>
                  <small className='text-muted'>Enter new password</small>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('password')} type="text" id="typeEmailX-2" className="form-control form-control-lg" placeholder='new password' />
                    </div>
                    <div className="form-group my-4">
                      <input {...formik.getFieldProps('confirm_pwd')} type="text" id="typeEmailX-2" className="form-control form-control-lg" placeholder='retype password' />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset</button>
                  </form>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
