import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from './helper/apiconfig';
import './style.css';
import { useNavigate } from 'react-router-dom';
// import useFetch from '../hooks/fetch.hook';

export default function Recovery() {
  const { username } = useAuthStore(state => state.auth);
  // const [{isLoading,apiData}] = useFetch(); --planned
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if (OTP) return toast.success('OTP has been send to your email!');
      return toast.error('an error occured while generating OTP!')
    })
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP })
      if (status === 201) {
        toast.success('Verified Successfully!')
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wrong OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP() {

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise,
      {
        loading: <b>Sending otp...</b>,
        success: <b>OTP has been sent to your email!</b>,
        error: <b>an error occured!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });

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
                  <h3 className="mb-5">Recovery</h3>
                  {/* <small className='text-muted'>Enter OTP</small> */}
                  <small className="text-muted text-left">Enter 6 digit OTP sent to your email.</small>
                  <form onSubmit={onSubmit}>
                    <div className="form-group my-4">
                      <input onChange={(e) => setOTP(e.target.value)} type="text" id="otp-2" className="form-control form-control-lg" placeholder='OTP' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  <hr className="my-4" />
                  {/* <div className="text-center">
                    <small>forgot password? <Link to="/recovery" className="text-danger">recover</Link></small>
                  </div> */}
                  <div className="text-center">
                    <small>Can't get OTP? <button onClick={resendOTP} className="text-danger bg-white">Resend</button></small>
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
