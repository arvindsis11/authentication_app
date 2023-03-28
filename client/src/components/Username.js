import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Username() {
  return (
    <>
      <section className="vh-100" style={{ "background-color": "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ "border-radius": "1rem" }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  <form>
                    <div class="form-group my-4">
                      <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder='email' />
                    </div>
                    <div class="form-group my-4">
                      <input type="password" id="typeEmailX-2" className="form-control form-control-lg" placeholder='password' />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                  <hr className="my-4" />
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
