import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from './helper/validate';
import { resetPassword } from './helper/apiconfig';
import './style.css';
import { useAuthStore } from '../store/store';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

export default function Reset() {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ apiData,status,serverError,isLoading }] = useFetch('createResetSession');
  useEffect(()=>{
    console.log(apiData,status,serverError,isLoading);
  })

  const formik = useFormik({
    initialValues: {
      password: 'admin@123',
      confirm_pwd: 'admin@123'
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {

      let resetPromise = resetPassword({ username, password: values.password });


      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>
      });

      resetPromise.then(function () { navigate('/') })

    }
  })


  // if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>; fix here
  if (serverError)  return <Navigate to={'/userverify'} replace={true}></Navigate>
  if (status && status !== 201) return <Navigate to={'/userverify'} replace={true}></Navigate>
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
