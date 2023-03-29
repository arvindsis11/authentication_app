import React from 'react';
import {Toaster} from 'react-hot-toast';
import './style.css';

export default function Recovery() {


  return (
    <>
      <section className="vh-100" style={{ "backgroundColor": "#508bfc" }}>
        <div className="container py-5 h-100">
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ "borderRadius": "1rem" }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Recovery</h3>
                  <small className='text-muted'>Enter OTP</small>
                  <form>
                    <div className="form-group my-4">
                      <small className="text-sm text-left">Enter 6 digit OTP sent to your email.</small>
                      <input type="username" id="typeEmailX-2" className="form-control form-control-lg" placeholder='OTP' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  <hr className="my-4" />
                  {/* <div className="text-center">
                    <small>forgot password? <Link to="/recovery" className="text-danger">recover</Link></small>
                  </div> */}
                  <div className="text-center">
                    <small>Can't get OTP? <button  className="text-danger bg-white">Resend</button></small>
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
