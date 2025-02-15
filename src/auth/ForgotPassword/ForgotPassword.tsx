import { Link } from "react-router-dom"

import './ForgotPassword.css'

const ForgotPassword = () => {
    return (
        <section className="auth-section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-5 mx-auto mt-4">
                        <form action="" className="card auth-card mt-5">
                            <div className="card-body">

                                <div className="page-title">
                                    <h2 className="mb-0">Forgot Password</h2>
                                    <p>Enter your email address to reset your password.</p>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="email">Email Address</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                                </div>
                                <div className="form-group mb-3">
                                    <button className="btn btn-primary w-100">Reset Password</button>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="d-flex justify-content-between">
                                        <Link to="/login">Back to login</Link>
                                    </div>
                                </div>


                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ForgotPassword