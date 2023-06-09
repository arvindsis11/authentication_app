import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from './helper/validate';
import userpic from './assets/userpic.jpg';
import convertToBase64 from './helper/convert';
import useFetch from '../hooks/fetch.hook';
import './style.css';
// import { useAuthStore } from '../store/store';
import { updateUser } from './helper/apiconfig';

export default function Profile() {


  const [file, setFile] = useState();
  // const {username} = useAuthStore(state => state.auth);
  const [{isLoading,apiData,serverError}] = useFetch();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(apiData);
  })

  const formik = useFormik({
    initialValues: {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || ''
    },
    enableReinitialize : true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || apiData?.profile || '' });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise,{
        loading: 'Updating....',
        success : <b>Updated successfully...!</b>,
        error : <b>Profile could not be updated</b>
      })
      console.log(values)
    }
  })
  /**formik not supports file upload so we will create a function */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }
/** logout handler function */
function userLogOut(){
  localStorage.removeItem('token');
  navigate('/');
}
  if(isLoading) return <h1 className="text-center text-danger">isLoading</h1>
  if(serverError) return <h1 className="text-center text-danger">{serverError.message}</h1>
  if (isLoading === undefined || serverError===undefined|| apiData===undefined) {
    return null;
  }

  return (
    <>
      <section className="vh-100" style={{ "backgroundColor": "#508bfc" }}>
        <div className="container py-5 h-100">
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ "borderRadius": "1rem" }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-3">Profile</h3>
                  <small className='text-muted'>Hi welcome {apiData?.username}!</small>
                  <div>
                    <label htmlFor="profile">
                      <img src={apiData?.profile || file || userpic} className="mx-auto d-block" alt="John" style={{ width: "30%", borderRadius: "50%" }} />
                    </label>
                    <input onChange={onUpload} type="file" name="profile" id="profile" />
                  </div>
                  <hr className="my-2" />
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="form-group col-md-6 my-2">
                        <input {...formik.getFieldProps('firstName')} type="text"  id="firstname" className="form-control form-control-sm" placeholder='firstname' />
                      </div>
                      <div className="form-group col-md-6 my-2">
                        <input {...formik.getFieldProps('lastName')} type="text"  id="lastname" className="form-control form-control-sm" placeholder='lastname' />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 my-2">
                        <input {...formik.getFieldProps('mobile')} type="text" id="mobile" className="form-control form-control-sm" placeholder='Contact No' />
                      </div>
                      <div className="form-group col-md-6 my-2">
                        <input {...formik.getFieldProps('email')} type="text" id="email" className="form-control form-control-sm" placeholder='Email*' />
                      </div>
                    </div>
                    <div className="form-group my-2">
                    <input {...formik.getFieldProps('address')} type="text" id="address" className="form-control form-control-sm" placeholder='address' />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                  </form>
                  <hr className="my-2" />
                  <div className="text-center">
                    <small>come back later? <button onClick={userLogOut}  className="text-danger">logout</button></small>
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
